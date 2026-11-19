# Kiểm Tra Mở Thẻ

Ứng dụng web cho iPhone: nhập thẻ tín dụng khách đang có, số công ty tài chính đang có dư nợ và công việc của khách, ứng dụng so với bảng điều kiện ngân hàng trên Google Sheet và cho biết khách có thể mở thẻ ở ngân hàng nào, kèm gợi ý cải thiện hồ sơ.

- **Ứng dụng** chạy trên GitHub Pages (file `index.html`).
- **Bảng điều kiện** nằm trong Google Sheet trên Drive của bạn (tab `DieuKien`).
- **Hồ sơ khách** sau khi kiểm tra được lưu vào cùng Google Sheet (tab `HoSo`, tự tạo).

Dữ liệu khách **không** nằm trên GitHub. Ứng dụng nói chuyện với Google Sheet qua một Apps Script có mã bí mật.

---

## Bước 1 – Tạo Google Sheet điều kiện

1. Vào Google Drive → **Mới → Google Trang tính**, đặt tên ví dụ `Điều kiện mở thẻ`.
2. **Tệp → Nhập → Tải lên** file `mau-bang-dieu-kien.csv` → chọn **Thay thế trang tính hiện tại**.
3. Đổi tên tab thành **`DieuKien`** (đúng chữ, không dấu).
4. Thay dữ liệu mẫu bằng điều kiện thật của bạn.

### Các cột trong bảng

| Cột | Cách ghi | Ví dụ |
|---|---|---|
| Ngân hàng | Tên ngân hàng | VPBank |
| Tên gọi khác | Tên viết tắt, cách nhau dấu phẩy (để nhận ra khi khách đã có thẻ) | VPB, VP |
| Áp dụng | `Có` / `Không` (Không = tạm bỏ qua ngân hàng này) | Có |
| Hình thức mở | `Online`, `Offline` hoặc `Online + Offline` | Online + Offline |
| Điều kiện mở online | Ghi chữ tự do, hiện trong kết quả | Có thẻ TD NH khác từ 6 tháng |
| Điều kiện mở offline | Ghi chữ tự do, hiện trong kết quả | CCCD + sao kê lương 3 tháng |
| Cần công việc | `Không` = không cần. `Có` = cần chứng minh công việc. Hoặc ghi rõ loại nhận: `HĐLĐ`, `HKD`, `Online`, `Tất cả` (có thể ghi nhiều, cách dấu phẩy) | HĐLĐ, HKD |
| Tỷ lệ sử dụng | `Dưới 70%`, `Trên 20%`, `Trên 20%, dưới 85%`, hoặc `Không yêu cầu` | Dưới 80% |
| Số thẻ tối đa | Số thẻ khách **đang có** tối đa. Để trống = không giới hạn | 5 |
| Số CTTC tối đa | Số công ty tài chính đang có dư nợ tối đa. `0` = không nhận khách có CTTC | 2 |
| Cần thẻ cũ | `Có` nếu chỉ mở qua thẻ (khách phải có sẵn thẻ tín dụng) | Có |
| HM thẻ cũ tối thiểu (tr) | Hạn mức thẻ cũ cao nhất phải từ bao nhiêu triệu | 20 |
| Ghi chú | Hiện trong kết quả | |

Hai cột cuối (`Cần thẻ cũ`, `HM thẻ cũ tối thiểu`) là tuỳ chọn, xoá đi cũng được. Có thể thêm cột `Số ngân hàng tối đa` nếu ngân hàng giới hạn số ngân hàng khách đã có thẻ.

### Cách ứng dụng chấm

- **Không phù hợp:** có nợ xấu, khác hình thức mở khách muốn, công việc không được nhận, vượt số CTTC tối đa, vượt số thẻ tối đa, cần thẻ cũ mà khách chưa có, hạn mức thẻ cũ thấp hơn yêu cầu.
- **Cân nhắc:** chỉ lệch về tỷ lệ sử dụng (khách có thể thanh toán bớt để đạt).
- **Đã có thẻ:** khách đã có thẻ tại ngân hàng đó.
- **Gợi ý:** ứng dụng thử các trường hợp như tất toán bớt CTTC, giảm tỷ lệ sử dụng về 30%, chuyển sang hồ sơ HĐLĐ, đổi online/offline, và báo ngân hàng nào mở thêm được.

## Bước 2 – Gắn Apps Script vào Google Sheet

1. Trong Google Sheet: **Tiện ích mở rộng → Apps Script**.
2. Xoá nội dung có sẵn, dán toàn bộ file `google-apps-script/Code.gs`.
3. Sửa dòng `const MA_BI_MAT = 'doi-ma-nay-ngay';` thành mã riêng của bạn (ít nhất 8 ký tự, đừng chia sẻ).
4. Bấm **Lưu** (biểu tượng đĩa mềm).
5. **Triển khai → Tùy chọn triển khai mới** → bánh răng → **Ứng dụng web**:
   - *Thực thi với tư cách:* **Tôi**
   - *Người có quyền truy cập:* **Bất kỳ ai**
6. Bấm **Triển khai**, cấp quyền cho tài khoản Google của bạn (nếu hiện cảnh báo “ứng dụng chưa được xác minh” thì chọn *Nâng cao → Đi tới … (không an toàn)* – đây là script của chính bạn).
7. Sao chép **URL ứng dụng web** (kết thúc bằng `/exec`).

> "Bất kỳ ai" chỉ có nghĩa là ai có link mới gọi được, và vẫn phải có đúng mã bí mật mới đọc/ghi được dữ liệu.

Khi sửa lại `Code.gs` sau này: **Triển khai → Quản lý các bản triển khai → sửa (bút chì) → Phiên bản: Mới → Triển khai**, để giữ nguyên link cũ.

## Bước 3 – Mở trên iPhone

1. Mở link GitHub Pages bằng **Safari**.
2. Vào tab **Điều kiện** → dán link `/exec` và mã bí mật → **Lưu & tải điều kiện**.
3. Bấm nút **Chia sẻ** → **Thêm vào MH chính**.

Link và mã bí mật chỉ lưu trên điện thoại đó. Máy khác cần nhập lại một lần.

Mỗi khi sửa bảng điều kiện trên Google Sheet, mở ứng dụng là tự tải bản mới (hoặc bấm **Lưu & tải điều kiện**).

## Cấu trúc thư mục

```
index.html                    ứng dụng (GitHub Pages)
icon.png                      biểu tượng khi thêm vào màn hình chính
mau-bang-dieu-kien.csv        bảng điều kiện mẫu để nhập vào Google Sheet
google-apps-script/Code.gs    script dán vào Google Sheet
```
