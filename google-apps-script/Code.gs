/**
 * Kiểm Tra Mở Thẻ – cầu nối giữa ứng dụng và file CSV điều kiện trên Google Drive.
 * - GET: ai cũng đọc được bảng điều kiện.
 * - POST có mã quản trị: ghi bảng điều kiện mới lên file (sao lưu bản cũ trước khi ghi).
 *
 * Cài đặt: script.google.com → Dự án mới → dán file này → đổi MA_QUAN_TRI
 * → Triển khai → Ứng dụng web (Thực thi: Tôi, Truy cập: Bất kỳ ai). Xem README.md.
 */

// ID file CSV điều kiện trên Drive (phần giữa /d/ và /view trong link chia sẻ).
const FILE_ID = '1T6XZYKhf8akykGFN-aiZM42wz9qtoKtm';

// Mã quản trị: chỉ ai có mã này mới sửa được điều kiện. Đổi thành mã riêng, ít nhất 8 ký tự.
const MA_QUAN_TRI = 'doi-ma-nay-ngay';

// Thư mục giữ bản sao lưu trước mỗi lần sửa, và số bản giữ lại.
const THU_MUC_SAO_LUU = 'Sao lưu điều kiện mở thẻ';
const SO_BAN_SAO_LUU = 30;

/** Ai cũng đọc được bảng điều kiện (không cần mã) – ứng dụng gọi khi bấm "Cập nhật chính sách". */
function doGet() {
  try {
    const file = DriveApp.getFileById(FILE_ID);
    return out({
      ok: true,
      csv: file.getBlob().getDataAsString('UTF-8').replace(/^﻿/, ''),
      updatedAt: file.getLastUpdated().toISOString()
    });
  } catch (err) {
    return out({ ok: false, error: String(err && err.message || err) });
  }
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (String(body.key || '') !== MA_QUAN_TRI) return out({ ok: false, error: 'Sai mã quản trị' });

    const file = DriveApp.getFileById(FILE_ID);
    if (body.action === 'check') {
      return out({ ok: true, name: file.getName(), updatedAt: file.getLastUpdated().toISOString() });
    }
    if (body.action === 'save') {
      const csv = String(body.csv || '').replace(/^﻿/, '');
      const header = csv.split(/\r?\n/)[0] || '';
      if (header.indexOf('Ngân hàng') < 0) return out({ ok: false, error: 'Dữ liệu không có cột "Ngân hàng"' });
      if (csv.length > 500000) return out({ ok: false, error: 'Dữ liệu quá lớn' });

      const lock = LockService.getScriptLock();
      lock.waitLock(15000);
      try {
        backup(file);
        file.setContent('﻿' + csv);
      } finally {
        lock.releaseLock();
      }
      return out({ ok: true, updatedAt: new Date().toISOString() });
    }
    return out({ ok: false, error: 'Yêu cầu không hợp lệ' });
  } catch (err) {
    return out({ ok: false, error: String(err && err.message || err) });
  }
}

function backup(file) {
  const it = DriveApp.getFoldersByName(THU_MUC_SAO_LUU);
  const folder = it.hasNext() ? it.next() : DriveApp.createFolder(THU_MUC_SAO_LUU);
  const stamp = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'yyyy-MM-dd HH-mm-ss');
  file.makeCopy(stamp + ' ' + file.getName(), folder);

  const copies = [];
  const files = folder.getFiles();
  while (files.hasNext()) copies.push(files.next());
  copies.sort((a, b) => b.getDateCreated() - a.getDateCreated());
  copies.slice(SO_BAN_SAO_LUU).forEach(f => f.setTrashed(true));
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
