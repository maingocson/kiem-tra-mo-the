# Kiểm Tra Mở Thẻ

Ứng dụng web cho iPhone: nhập thẻ tín dụng khách đang có, số công ty tài chính đang có dư nợ và công việc của khách. Ứng dụng so với bảng điều kiện mở thẻ online của các ngân hàng và cho biết khách có thể mở thẻ ở ngân hàng nào, kèm gợi ý cải thiện hồ sơ.

- **Ứng dụng:** https://maingocson.github.io/kiem-tra-mo-the/
- **Bảng điều kiện (chính sách):** một file CSV trên Google Drive của bạn.
- **Người quản trị** (có mã quản trị) sửa điều kiện ngay trong app, bấm **Lưu lên file** là file trên Drive được cập nhật.
- **Người dùng khác** bấm **Cập nhật chính sách** để tải bản mới. Khi có bản mới, thanh chính sách đổi màu để nhắc.
- **Thông tin khách** chỉ nằm trên điện thoại đang dùng, không gửi đi đâu.

App đọc và ghi file qua một **Apps Script** chạy bằng tài khoản Google của bạn, vì Google Drive không cho trang web đọc hay ghi file trực tiếp.

---

## Bước 1 – File điều kiện trên Drive

File CSV điều kiện đã có trên Drive. Có thể sửa bằng app (khuyên dùng) hoặc tải về, sửa, rồi tải lên **thay thế** file cũ (giữ nguyên file, không tạo file mới).

### Các cột trong bảng

App chỉ xét **mở thẻ online**. Ba điều kiện chính là con số, khách đạt khi **nhỏ hơn hoặc bằng** con số đó:

| Cột | Cách ghi | Ví dụ |
|---|---|---|
| Ngân hàng | Tên ngân hàng | VPBank |
| Tên gọi khác | Tên viết tắt, cách nhau dấu phẩy (để nhận ra khi khách đã có thẻ) | VPB, VP |
| Áp dụng | `Có` / `Không` (Không = tạm bỏ qua ngân hàng này) | Có |
| Tỷ lệ sử dụng tối đa (%) | Khách đạt khi tỷ lệ dùng hạn mức **≤** số này. Để trống = không giới hạn | 80 |
| Số thẻ tối đa | Khách đạt khi số thẻ **đang có ≤** số này. Để trống = không giới hạn | 5 |
| Số CTTC tối đa | Khách đạt khi số công ty tài chính đang có dư nợ **≤** số này. `0` = không nhận khách có CTTC | 2 |
| Cần công việc | `Không` = không cần. `Có` = cần chứng minh công việc (loại nào cũng được). Hoặc ghi rõ loại nhận: `HĐLĐ`, `HKD`, `Online`, `Tự do` (ghi nhiều thì cách dấu phẩy) | Không |
| Cần thẻ cũ | `Có` nếu chỉ mở qua thẻ (khách phải có sẵn thẻ tín dụng) | Có |
| Ghi chú | Hiện trong kết quả. Nếu có chữ **ĐB** (điều kiện đặc biệt), app gắn nhãn ĐB và nhắc tự kiểm tra khách có thoả không | ĐB: thẻ cũ phải mở trên 6 tháng |

Các cột `Cần công việc`, `Cần thẻ cũ` là tuỳ chọn, xoá đi cũng được. Có thể thêm cột `Số ngân hàng tối đa` nếu ngân hàng giới hạn số ngân hàng khách đã có thẻ.

### Cách ứng dụng chấm

- **Có thể mở:** đạt hết điều kiện.
- **Cần giảm dư nợ:** chỉ vượt tỷ lệ sử dụng. App ghi rõ khách cần trả bớt khoảng bao nhiêu triệu để đạt.
- **Không phù hợp:** có nợ xấu, vượt số thẻ hoặc số CTTC, công việc không được nhận, hoặc cần thẻ cũ mà khách chưa có.
- **ĐB:** ngân hàng có chữ ĐB trong ghi chú vẫn được chấm như thường, nhưng gắn nhãn ĐB và hiện ghi chú nổi bật để bạn tự kiểm tra.
- **Đã có thẻ:** khách đã có thẻ tại ngân hàng đó.
- **Gợi ý:** app thử các trường hợp như tất toán bớt CTTC, giảm tỷ lệ sử dụng về 30%, chuyển sang hồ sơ HĐLĐ, và báo ngân hàng nào mở thêm được.

## Bước 2 – Tạo Apps Script

1. Vào https://script.google.com bằng **tài khoản Google đang sở hữu file CSV** → **Dự án mới**.
2. Xoá nội dung có sẵn, dán toàn bộ file `google-apps-script/Code.gs`.
3. Kiểm tra dòng `FILE_ID` (đã điền sẵn ID file của bạn) và đổi `MA_QUAN_TRI` thành mã riêng, ít nhất 8 ký tự.
4. Bấm **Lưu**.
5. **Triển khai → Tùy chọn triển khai mới** → bánh răng → **Ứng dụng web**:
   - *Thực thi với tư cách:* **Tôi**
   - *Người có quyền truy cập:* **Bất kỳ ai**
6. Bấm **Triển khai** và cấp quyền. Nếu hiện cảnh báo "ứng dụng chưa được xác minh": chọn *Nâng cao → Đi tới … (không an toàn)*. Đây là script của chính bạn.
7. Sao chép **URL ứng dụng web** (kết thúc bằng `/exec`).

Ai có link `/exec` cũng **đọc** được bảng điều kiện, nhưng chỉ người có **mã quản trị** mới **sửa** được.

Trước mỗi lần lưu, script tự sao lưu bản cũ vào thư mục **"Sao lưu điều kiện mở thẻ"** trên Drive (giữ 30 bản gần nhất).

Khi sửa `Code.gs` sau này: **Triển khai → Quản lý các bản triển khai → bút chì → Phiên bản: Mới → Triển khai**, để giữ nguyên link.

## Bước 3 – Gắn link vào app

Dán link `/exec` vào dòng này trong `index.html` rồi đẩy lên GitHub:

```js
const SCRIPT_URL="";
```

Sau bước này, ai mở app cũng đọc được chính sách.

## Cách dùng

- **Người dùng:** mở app → bấm **Cập nhật chính sách** khi thanh trên cùng báo "Có chính sách mới" (hoặc bất cứ lúc nào).
- **Quản trị:** tab **Điều kiện** → **Quản trị – sửa điều kiện** → nhập link `/exec` và mã quản trị → **Bật chế độ sửa** → sửa / thêm / xoá ngân hàng → **Lưu lên file**.
- **Thêm vào màn hình chính iPhone:** mở link app bằng Safari → **Chia sẻ** → **Thêm vào MH chính**.

## Cấu trúc thư mục

```
index.html                    ứng dụng (GitHub Pages)
icon.png                      biểu tượng trên màn hình chính
mau-bang-dieu-kien.csv        bảng điều kiện mẫu
google-apps-script/Code.gs    script đọc/ghi file điều kiện trên Drive
```
