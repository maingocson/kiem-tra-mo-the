# Kiểm Tra Mở Thẻ

Ứng dụng web cho iPhone: nhập thẻ tín dụng khách đang có, số công ty tài chính đang có dư nợ và công việc của khách. Ứng dụng so với bảng điều kiện mở thẻ online của các ngân hàng và cho biết khách có thể mở thẻ ở ngân hàng nào, kèm gợi ý cải thiện hồ sơ.

- **Ứng dụng:** https://maingocson.github.io/kiem-tra-mo-the/
- **Bảng điều kiện:** một Google Sheet được công bố dạng CSV. Ứng dụng tự tải mỗi lần mở.
- **Thông tin khách:** chỉ nằm trên điện thoại đang dùng, không gửi đi đâu và không lưu lên mạng.

---

## Bước 1 – Tạo bảng điều kiện trên Google Sheet

1. Tải file mẫu `mau-bang-dieu-kien.csv` (trên GitHub bấm **Download raw file**).
2. Vào Google Drive → **Mới → Google Trang tính**.
3. **Tệp → Nhập → Tải lên** file CSV → chọn **Thay thế trang tính hiện tại**.
4. Thay dữ liệu mẫu bằng điều kiện thật.

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

## Bước 2 – Công bố bảng điều kiện thành link CSV

1. Trong Google Sheet: **Tệp → Chia sẻ → Công bố lên web**.
2. Chọn trang tính chứa điều kiện, định dạng **Giá trị được phân tách bằng dấu phẩy (.csv)** → **Công bố**.
3. Sao chép link (dạng `https://docs.google.com/spreadsheets/d/e/…/pub?…&output=csv`).

Link này **ai có cũng xem được**, nên chỉ để bảng điều kiện trong file này, không để thông tin khách.

Sửa Sheet xong thì Google tự cập nhật link CSV, thường chậm khoảng 5 phút.

## Bước 3 – Gắn link vào ứng dụng

**Cho mọi người dùng chung (khuyên dùng):** mở `index.html`, dán link vào dòng

```js
const CSV_URL="";
```

rồi đẩy lên GitHub. Ai mở app cũng tự dùng bảng điều kiện này, không cần cài gì.

**Chỉ trên một máy:** mở app → tab **Điều kiện** → **Đổi link file điều kiện** → dán link → **Lưu link**.

## Bước 4 – Thêm vào màn hình chính iPhone

Mở link app bằng **Safari** → nút **Chia sẻ** → **Thêm vào MH chính**.

## Cấu trúc thư mục

```
index.html               ứng dụng (GitHub Pages)
icon.png                 biểu tượng trên màn hình chính
mau-bang-dieu-kien.csv   bảng điều kiện mẫu để nhập vào Google Sheet
```
