# Kiểm Tra Mở Thẻ

Ứng dụng web cho iPhone: nhập thẻ tín dụng khách đang có, số công ty tài chính đang có dư nợ và công việc của khách. Ứng dụng so với bảng điều kiện mở thẻ online của các ngân hàng và cho biết khách có thể mở thẻ ở ngân hàng nào, kèm gợi ý cải thiện hồ sơ.

**Ứng dụng:** https://maingocson.github.io/kiem-tra-mo-the/

- **Không cần tài khoản, không cần đăng nhập.**
- **Mọi dữ liệu nằm trên điện thoại:** bảng điều kiện và thông tin khách đều lưu ngay trên máy, không gửi lên mạng. Mất mạng vẫn dùng được.
- Mỗi máy có bảng điều kiện riêng. Muốn dùng chung cho máy khác thì **Sao lưu ra file** rồi gửi file cho người kia **Phục hồi từ file**.

## Cách dùng

1. Mở link app bằng **Safari** → nút **Chia sẻ** → **Thêm vào MH chính**.
2. Lần đầu app dùng **điều kiện mẫu**. Vào tab **Điều kiện** (cần mật khẩu; mở khoá một lần là dùng được đến khi tắt app, hoặc bấm **Khoá lại**) → **Sửa điều kiện** để nhập điều kiện thật:
   - sửa từng ngân hàng, **+ Thêm ngân hàng**, hoặc **Xoá ngân hàng này** (bấm 2 lần);
   - bấm **Lưu** ở thanh dưới cùng. **Huỷ** để bỏ thay đổi.
3. Tab **Kiểm tra**: nhập thẻ khách đang có, số công ty tài chính, công việc → **Kiểm tra ngân hàng có thể mở**.

## Sao lưu & phục hồi (tab Điều kiện)

- **Sao lưu ra file:** xuất bảng điều kiện đang dùng thành file `.csv`. Trên iPhone chọn *Lưu vào Tệp*, hoặc gửi qua Zalo, email…
- **Phục hồi từ file:** chọn file `.csv` đã sao lưu, hoặc file nhận từ người khác.
- **Các bản đã lưu trên máy:** app tự giữ 20 bản gần nhất (mỗi lần Lưu hay phục hồi). Bấm **Khôi phục** để quay lại bản cũ, hoặc **Tải file** để lấy bản đó ra.

**Nên sao lưu ra file sau mỗi lần sửa.** Dữ liệu trên máy sẽ mất nếu xoá app khỏi màn hình chính, hoặc xoá dữ liệu trang web trong Cài đặt Safari.

### Các cột trong file sao lưu (CSV)

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
| Ghi chú | Hiện trong kết quả. Nếu có chữ **ĐB** (điều kiện đặc biệt): app chỉ nhắc kiểm tra ĐB ở **bước cuối**, khi khách đã thoả mọi điều kiện khác. Không thoả điều kiện khác thì báo Không phù hợp, không nhắc ĐB | ĐB: thẻ cũ phải mở trên 6 tháng |

Các cột `Cần công việc`, `Cần thẻ cũ` là tuỳ chọn, xoá đi cũng được. Có thể thêm cột `Số ngân hàng tối đa` nếu ngân hàng giới hạn số ngân hàng khách đã có thẻ.

### Cách ứng dụng chấm

- **Có thể mở:** đạt hết điều kiện.
- **Cần giảm dư nợ:** chỉ vượt tỷ lệ sử dụng. App ghi rõ khách cần trả bớt khoảng bao nhiêu triệu để đạt.
- **Không phù hợp:** có nợ xấu, vượt số thẻ hoặc số CTTC, công việc không được nhận, hoặc cần thẻ cũ mà khách chưa có.
- **ĐB:** ngân hàng có chữ ĐB trong ghi chú vẫn được chấm như thường, nhưng gắn nhãn ĐB và hiện ghi chú nổi bật để bạn tự kiểm tra.
- **Đã có thẻ:** khách đã có thẻ tại ngân hàng đó.
- **Gợi ý:** app thử các trường hợp như tất toán bớt CTTC, giảm tỷ lệ sử dụng về 30%, chuyển sang hồ sơ HĐLĐ, và báo ngân hàng nào mở thêm được.

## Cấu trúc thư mục

```
index.html               ứng dụng (GitHub Pages)
icon.png                 biểu tượng trên màn hình chính
mau-bang-dieu-kien.csv   bảng điều kiện mẫu (có thể Phục hồi từ file này)
```
