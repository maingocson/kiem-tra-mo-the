/**
 * Kiểm Tra Mở Thẻ – cầu nối giữa ứng dụng trên iPhone và Google Sheet trên Drive.
 *
 * Cách dùng: mở Google Sheet chứa bảng điều kiện → Tiện ích mở rộng → Apps Script
 * → dán toàn bộ file này → đổi MA_BI_MAT bên dưới → Triển khai → Ứng dụng web.
 * Xem hướng dẫn chi tiết trong README.md.
 */

// Đổi thành mã riêng của bạn (ít nhất 8 ký tự). Nhập đúng mã này trong ứng dụng.
const MA_BI_MAT = 'doi-ma-nay-ngay';

const SHEET_DIEU_KIEN = 'DieuKien';   // tab chứa bảng điều kiện ngân hàng
const SHEET_HO_SO = 'HoSo';           // tab lưu hồ sơ khách đã kiểm tra

const HO_SO_HEADERS = [
  'Thời gian', 'Mã hồ sơ', 'Tên khách', 'SĐT', 'Công việc', 'Số CTTC',
  'Số NH có thẻ', 'Tổng số thẻ', 'Tổng HM cấp (tr)', 'Tỷ lệ sử dụng (%)', 'Nợ xấu',
  'Có thể mở', 'Cân nhắc', 'Không phù hợp', 'Ghi chú', 'Dữ liệu (không sửa)'
];

function doGet() {
  return out({ ok: true, message: 'Kết nối hoạt động. Ứng dụng gửi yêu cầu bằng POST.' });
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (String(body.key || '') !== MA_BI_MAT) return out({ ok: false, error: 'Sai mã bí mật' });

    switch (body.action) {
      case 'rules':   return out({ ok: true, rules: readRules(), sheetUrl: ss().getUrl(), at: new Date().toISOString() });
      case 'save':    return out(saveRecord(body.record || {}));
      case 'history': return out({ ok: true, items: readHistory(Number(body.limit) || 100) });
      default:        return out({ ok: false, error: 'Yêu cầu không hợp lệ' });
    }
  } catch (err) {
    return out({ ok: false, error: String(err && err.message || err) });
  }
}

function ss() { return SpreadsheetApp.getActiveSpreadsheet(); }

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Đọc tab DieuKien: dòng 1 là tiêu đề, mỗi dòng sau là một ngân hàng. */
function readRules() {
  const sh = ss().getSheetByName(SHEET_DIEU_KIEN);
  if (!sh) throw new Error('Không thấy tab "' + SHEET_DIEU_KIEN + '" trong Google Sheet');
  const values = sh.getDataRange().getDisplayValues();
  if (values.length < 2) return [];
  const headers = values[0].map(h => String(h).trim());
  return values.slice(1)
    .filter(row => row.some(c => String(c).trim() !== ''))
    .map(row => {
      const o = {};
      headers.forEach((h, i) => { if (h) o[h] = String(row[i] == null ? '' : row[i]).trim(); });
      return o;
    });
}

function hoSoSheet() {
  let sh = ss().getSheetByName(SHEET_HO_SO);
  if (!sh) {
    sh = ss().insertSheet(SHEET_HO_SO);
    sh.appendRow(HO_SO_HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HO_SO_HEADERS.length).setFontWeight('bold');
  }
  return sh;
}

function saveRecord(r) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = hoSoSheet();
    const id = r.id || Utilities.getUuid().slice(0, 8);
    const row = [
      new Date(), id, r.name || '', r.phone ? "'" + r.phone : '', r.job || '', r.finCos,
      r.bankCount, r.cards, r.limit, r.util, r.badDebt ? 'Có' : 'Không',
      (r.ok || []).join(', '), (r.warn || []).join(', '), (r.bad || []).join(', '),
      r.note || '', JSON.stringify(r.customer || {})
    ];
    // Lưu lại cùng mã hồ sơ thì ghi đè dòng cũ, không tạo dòng mới.
    const ids = sh.getLastRow() > 1 ? sh.getRange(2, 2, sh.getLastRow() - 1, 1).getValues().map(v => String(v[0])) : [];
    const idx = ids.indexOf(String(id));
    if (idx >= 0) sh.getRange(idx + 2, 1, 1, row.length).setValues([row]);
    else sh.appendRow(row);
    return { ok: true, id: id };
  } finally {
    lock.releaseLock();
  }
}

function readHistory(limit) {
  const sh = ss().getSheetByName(SHEET_HO_SO);
  if (!sh || sh.getLastRow() < 2) return [];
  const n = sh.getLastRow() - 1;
  const values = sh.getRange(2, 1, n, HO_SO_HEADERS.length).getValues();
  return values.reverse().slice(0, limit).map(v => {
    let customer = {};
    try { customer = JSON.parse(v[15] || '{}'); } catch (e) {}
    return {
      at: v[0] instanceof Date ? v[0].toISOString() : String(v[0]),
      id: String(v[1]), name: String(v[2]), phone: String(v[3]).replace(/^'/, ''),
      job: String(v[4]), ok: String(v[11]), customer: customer
    };
  });
}
