# Kiểm Tra Mở Thẻ

Ứng dụng web cho iPhone: nhập thẻ tín dụng khách đang có, số công ty tài chính đang có dư nợ và công việc của khách. Ứng dụng so với bảng điều kiện mở thẻ online của các ngân hàng và cho biết khách có thể mở thẻ ở ngân hàng nào, kèm gợi ý cải thiện hồ sơ.

**Ứng dụng:** https://maingocson.github.io/kiem-tra-mo-the/

- **Không cần tài khoản, không cần đăng nhập.**
- **Mọi dữ liệu nằm trên điện thoại:** bảng điều kiện và thông tin khách đều lưu ngay trên máy, không gửi lên mạng. Mất mạng vẫn dùng được.
- Mỗi máy có bảng điều kiện riêng. Muốn dùng chung cho máy khác thì **Sao lưu ra file** rồi gửi file cho người kia **Phục hồi từ file**.

Ô tên ngân hàng có gợi ý sẵn **danh mục đầy đủ ngân hàng tại Việt Nam** (nhà nước, cổ phần, ngân hàng số, ngân hàng nước ngoài).

## Cách dùng

1. Mở link app bằng **Safari** → nút **Chia sẻ** → **Thêm vào MH chính**.
2. Lần đầu app dùng **điều kiện mẫu**. Vào tab **Điều kiện** (cần mật khẩu; mở khoá một lần là dùng được đến khi tắt app, hoặc bấm **Khoá lại**) → **Sửa điều kiện** để nhập điều kiện thật:
   - sửa từng ngân hàng, **+ Thêm ngân hàng**, hoặc **Xoá ngân hàng này** (bấm 2 lần);
   - bấm **Lưu** ở thanh dưới cùng. **Huỷ** để bỏ thay đổi.
3. Tab **Kiểm tra**: nhập thẻ khách đang có, số công ty tài chính, công việc → **Kiểm tra ngân hàng có thể mở**.

## Giao diện

- Phong cách "sổ tay" (hướng D): nền trắng ngà, chữ có chân (Lora) cho tiêu đề và số lớn, màu xanh lá của app cho số chính và nút; màu cam đất chỉ dùng cho tiền "chờ điều kiện". Có chế độ tối theo máy.
- Thanh dưới: **Mở thẻ** · **Hoàn tiền** (mật khẩu riêng) · **Tôi** (mở khung trượt, giống bấm avatar).
- Thanh trên: avatar của bạn (góc trái), logo Smart-B (góc phải).
- Bấm avatar → khung trượt: Hồ sơ của tôi, Kiểm tra cho tôi, Khách hàng, Khách mới; mục **Cập nhật**: Cập nhật điều kiện mở thẻ (nạp file điều kiện mới); mục **Cấu hình**: Điều kiện mở thẻ (mật khẩu như cũ).
- **Tôi**: ảnh đại diện, họ tên, việc làm, BHXH, nhóm nợ CIC, số công ty tài chính, thẻ đang có (kèm nút **Kiểm tra mở thẻ mới cho tôi**); mục **Quản lý hoàn tiền chi tiêu**: chọn dòng thẻ hoàn tiền đang có trong danh mục, hạng thẻ, nhóm đã đăng ký (dùng chung với Kế hoạch hoàn tiền), nút **Lịch sử & kế hoạch chi tiêu** → **Lưu trên máy**. Đây là hồ sơ mặc định: Mở thẻ và Hoàn tiền tính theo hồ sơ này; khi tư vấn khách (Khách mới, mở khách đã lưu, đọc CIC của khách) thì tính theo khách, bấm **Về tôi** để quay lại.

## Sao lưu & phục hồi toàn bộ

- Dữ liệu chỉ nằm trong bộ nhớ của app trên máy (localStorage). **Xoá app khỏi màn hình chính là mất hết**, không khôi phục được nếu chưa sao lưu.
- Menu trái → **Sao lưu toàn bộ ra file**: gom hồ sơ Tôi, khách hàng, bảng điều kiện, danh sách ngân hàng, dữ liệu hoàn tiền vào một file `.json`; trên iPhone lưu vào app Tệp / iCloud Drive / gửi Zalo.
- Menu trái → **Phục hồi từ file**: chọn file đó, xác nhận → app nạp lại và tải lại trang.
- Menu trái và trang Tôi ghi ngày sao lưu gần nhất; chữ chuyển màu cam khi chưa sao lưu hoặc đã quá 7 ngày.

## Đọc CIC tự động

- Tab **Kiểm tra** → **Chọn file CIC**: chọn file PDF **CIC vay** ("Báo cáo chi tiết quan hệ tín dụng") và/hoặc **CIC thẻ** ("Báo cáo thông tin thẻ tín dụng"), chọn 1 hoặc cả 2 file cùng lúc. App tự nhận file nào là vay, file nào là thẻ.
- App hiện bảng xem trước, gồm:
  - tên khách, ngày CIC, điểm tín dụng;
  - thẻ đang hoạt động theo từng ngân hàng: số thẻ, hạn mức, dư nợ;
  - số công ty tài chính đang có dư nợ;
  - nợ quá hạn hiện tại;
  - lịch sử chậm thanh toán, nợ xấu, nợ cần chú ý, số lượt tra cứu CIC.
- Bấm **Điền vào hồ sơ & kiểm tra** để app điền vào hồ sơ và ra kết quả ngay. **Công việc** và **BHXH** không có trên CIC nên vẫn phải tự chọn.
- Nguồn số liệu:
  - Dư nợ thẻ lấy theo "số tiền phải thanh toán" trên CIC.
  - Số thẻ lấy từ CIC vay (mục 2.2). Nếu chỉ có CIC thẻ thì app đếm theo tên thẻ.
  - Công ty tài chính chỉ đếm được khi có CIC vay.
- Ngân hàng chưa có trong danh sách sẽ hiện dấu **?**. Thêm tên gọi khác ở tab **Điều kiện → Danh sách ngân hàng** để app nhận ra lần sau.
- File PDF phải là bản có chữ (tải từ hệ thống CIC). Ảnh chụp màn hình thì chưa đọc được.
- File chỉ được đọc trên máy. Lần đầu dùng cần có mạng để tải bộ đọc PDF.

## Khách hàng

- Tab **Kiểm tra** có ô **Tên khách hàng**, số điện thoại và ghi chú.
- Sau khi kiểm tra, bấm **Lưu khách hàng** để lưu hồ sơ. Lưu lại lần nữa sẽ cập nhật đúng hồ sơ đó, không tạo bản trùng. Bấm **Khách mới** để nhập khách khác.
- Tab **Khách hàng**: tìm theo tên, số điện thoại hoặc ngân hàng; **Mở** để xem lại và kiểm tra lại; **Xoá** (bấm 2 lần).
- **Sao lưu ra file / Phục hồi từ file** (file `.json`). Phục hồi sẽ gộp vào danh sách đang có.
- Dữ liệu khách **chỉ lưu trên điện thoại**, không gửi lên mạng.

## Xuất PDF kết quả

Bấm **Xuất PDF** ở phần Kết quả. File PDF có logo, thông tin khách, các thẻ đang có, ngân hàng có thể mở (kèm điều kiện ĐB cần kiểm tra), gợi ý và ngân hàng không phù hợp. PDF dùng chữ thật (không chụp ảnh màn hình), khổ A4, tự sang trang khi dài, có số trang. Trên iPhone, chọn gửi qua Zalo, email hoặc *Lưu vào Tệp*; nếu bảng chia sẻ không tự hiện, bấm nút **Mở / gửi PDF**. Lần đầu xuất PDF cần có mạng để tải công cụ tạo PDF.

## Logo công ty

App dùng sẵn logo **Smart-B** (Bank · Bridge · Benefit): `logo.svg` là bản gốc, `logo.png` hiện ở đầu app và trên PDF, `icon.png` là biểu tượng trên màn hình chính iPhone.

Muốn dùng logo khác trên một máy: tab **Điều kiện** → **Logo công ty** → **Chọn ảnh logo** (bấm **Xoá logo** để quay về Smart-B).

## Cập nhật điều kiện cho mọi người (bằng tay)

Thanh đầu trang hiện *Điều kiện ngày … · N ngân hàng* – ngày của bảng điều kiện đang dùng trên máy.

1. **Người quản lý:** sửa điều kiện ở tab Điều kiện, bấm **Lưu**, rồi **Sao lưu ra file** và gửi file CSV cho mọi người (Zalo, email…).
2. **Người dùng:** bấm avatar góc trên trái → mục **Cập nhật** → **Cập nhật điều kiện mở thẻ**, chọn file vừa nhận, bấm **Cập nhật** để xác nhận. Không cần mật khẩu. Bảng cũ vẫn giữ trong *Các bản đã lưu trên máy* (tab Điều kiện).

## Sao lưu & phục hồi (tab Điều kiện)

- **Sao lưu ra file:** xuất bảng điều kiện đang dùng thành file `.csv`. Trên iPhone chọn *Lưu vào Tệp*, hoặc gửi qua Zalo, email…
- **Phục hồi từ file:** chọn file `.csv` đã sao lưu, hoặc file nhận từ người khác.
- **Các bản đã lưu trên máy:** app tự giữ 20 bản gần nhất (mỗi lần Lưu hay phục hồi). Bấm **Khôi phục** để quay lại bản cũ, hoặc **Tải file** để lấy bản đó ra.

**Nên sao lưu ra file sau mỗi lần sửa.** Dữ liệu trên máy sẽ mất nếu xoá app khỏi màn hình chính, hoặc xoá dữ liệu trang web trong Cài đặt Safari.

## Danh sách ngân hàng (tab Điều kiện)

Danh sách dùng để gợi ý tên khi nhập và nhận ra khách đã có thẻ ở ngân hàng nào (kể cả khi gõ tên viết tắt).

- **+ Thêm:** nhập tên ngân hàng và tên gọi khác (cách nhau dấu phẩy). Nếu ngân hàng đã có, app chỉ thêm tên gọi khác.
- **Xoá:** mở *Xem và xoá ngân hàng*, bấm **Xoá** 2 lần. Có ô tìm nhanh.
- **Sao lưu ra file / Phục hồi từ file:** file `.csv` 2 cột `Ngân hàng,Tên gọi khác` (như `danh-muc-ngan-hang.csv`).
- **Về mặc định:** bỏ danh sách riêng, dùng lại danh sách có sẵn của app.

Danh sách này lưu riêng, độc lập với bảng điều kiện. Thêm một ngân hàng vào danh sách **không** tự cho app chấm điều kiện ngân hàng đó – muốn chấm thì thêm ở mục Điều kiện.

### Các cột trong file sao lưu (CSV)

App chỉ xét **mở thẻ online**. Ba điều kiện chính là con số, khách đạt khi **nhỏ hơn hoặc bằng** con số đó:

| Cột | Cách ghi | Ví dụ |
|---|---|---|
| Ngân hàng | Tên ngân hàng | VPBank |
| Tên gọi khác | Tên viết tắt, cách nhau dấu phẩy (để nhận ra khi khách đã có thẻ). App đã tự hiểu tên phổ biến của các ngân hàng Việt Nam, ví dụ TCB = Techcombank, NCB = Quốc Dân | VPB, VP |
| Áp dụng | `Có` / `Không` (Không = tạm bỏ qua ngân hàng này) | Có |
| Tỷ lệ sử dụng tối đa (%) | Khách đạt khi tỷ lệ dùng hạn mức **≤** số này. Để trống = không giới hạn | 80 |
| Số thẻ tối đa | Khách đạt khi số thẻ **đang có ≤** số này. Để trống = không giới hạn | 5 |
| Số CTTC tối đa | Khách đạt khi số công ty tài chính đang có dư nợ **≤** số này. `0` = không nhận khách có CTTC | 2 |
| Cần công việc | `Không` = không cần. `Có` = cần chứng minh công việc (loại nào cũng được). Hoặc ghi rõ loại nhận: `HĐLĐ`, `HKD`, `Online`, `Tự do` (ghi nhiều thì cách dấu phẩy) | Không |
| Cần thẻ cũ | `Có` nếu chỉ mở qua thẻ (khách phải có sẵn thẻ tín dụng) | Có |
| Bắt buộc BHXH | `Có` nếu ngân hàng bắt buộc khách có đóng bảo hiểm xã hội. Khách không có BHXH thì báo Không phù hợp | Không |
| Ghi chú | Hiện trong kết quả. Nếu có chữ **ĐB** (điều kiện đặc biệt): app chỉ nhắc kiểm tra ĐB ở **bước cuối**, khi khách đã thoả mọi điều kiện khác. Không thoả điều kiện khác thì báo Không phù hợp, không nhắc ĐB | ĐB: thẻ cũ phải mở trên 6 tháng |

Các cột `Cần công việc`, `Cần thẻ cũ`, `Bắt buộc BHXH` là tuỳ chọn, xoá đi cũng được. Có thể thêm cột `Số ngân hàng tối đa` nếu ngân hàng giới hạn số ngân hàng khách đã có thẻ.

### Cách ứng dụng chấm

- **Có thể mở:** đạt hết điều kiện.
- **Cần giảm dư nợ:** chỉ vượt tỷ lệ sử dụng. App ghi rõ khách cần trả bớt khoảng bao nhiêu triệu để đạt.
- **Không phù hợp:** có nợ xấu, vượt số thẻ hoặc số CTTC, công việc không được nhận, hoặc cần thẻ cũ mà khách chưa có.
- **ĐB:** ngân hàng có chữ ĐB trong ghi chú vẫn được chấm như thường, nhưng gắn nhãn ĐB và hiện ghi chú nổi bật để bạn tự kiểm tra.
- **Đã có thẻ:** khách đã có thẻ tại ngân hàng đó.
- **BHXH:** ở tab Kiểm tra bật/tắt *Có đóng bảo hiểm xã hội (BHXH)*. Ngân hàng đánh dấu *Bắt buộc có BHXH* mà khách không có thì báo Không phù hợp.
- **Gợi ý:** app thử các trường hợp như tất toán bớt CTTC, giảm tỷ lệ sử dụng về 30%, chuyển sang hồ sơ HĐLĐ, có BHXH, và báo ngân hàng nào mở thêm được.
- **Chuyên gia sửa gợi ý:** ở phần Gợi ý bấm **✎ Chuyên gia sửa**, nhập mật khẩu chuyên gia (khác mật khẩu tab Điều kiện), sửa nội dung (mỗi dòng một gợi ý) rồi **Lưu gợi ý**. Gợi ý đã sửa có ghi chú *“Đã được chuyên gia chỉnh sửa”* kèm thời gian, trên app và trên file PDF; gợi ý tự động vẫn xem được ở mục *Gợi ý tự động (tham khảo)*. Bấm **Dùng lại gợi ý tự động** để bỏ bản đã sửa. Gợi ý đã sửa lưu theo từng khách – bấm **Lưu khách hàng** để lưu vào hồ sơ.

## Hoàn tiền (tab Hoàn tiền)

Xem chính sách hoàn tiền của các thẻ tín dụng: tỷ lệ và trần theo từng mức chi tiêu, MCC, điều kiện, cách nhận tiền, loại trừ và link nguồn.

- Tìm theo tên thẻ, nhóm chi tiêu ("ăn uống", "siêu thị") hoặc mã MCC ("5411") – các thẻ khớp được xếp theo tỷ lệ hoàn cao nhất.
- Lọc theo ngân hàng; mặc định ẩn thẻ đã ngừng phát hành.
- Thẻ có "Hiệu lực đến" đã qua ngày hôm nay được làm mờ, ghi "hết hạn" và xếp cuối danh sách.
- Mức tin cậy: **A** có thể lệ đầy đủ · **B** theo trang thẻ · **C** chỉ có câu quảng cáo.

### Theo dõi chi tiêu theo kế hoạch

- Kết quả kế hoạch: số hoàn dự kiến lớn ở trên, các dòng Đã chi / Còn chi / Chờ đủ điều kiện / Đã được hoàn, khung **Việc cần làm** (hạn thanh toán, điều kiện còn thiếu kèm vòng tiến độ như 2/7 giao dịch, 1/3tr). Nút nổi **+ Ghi chi tiêu** đưa tới ô ghi nhanh.

- Hoàn tiền → Kế hoạch: nhập thẻ đang có (bước 1) và nhu cầu chi tiêu tháng (bước 3) → app lập kế hoạch: nhóm nào quẹt thẻ nào, bao nhiêu.
- Khi đã có thẻ, bước 3 **tự tính nhu cầu chi tiêu**: mỗi thẻ chi vừa đủ để lấy hết trần các nhóm hoàn cao và đủ ngưỡng mức (bỏ ưu đãi chỉ vài ngày/tuần, nhóm không trần tạm tính 3tr). Nhập **Ngân sách/tháng** để app chỉ chi trong ngân sách, ưu tiên nhóm hoàn cao. Sửa số bất kỳ thì app giữ số nhập tay; bấm **Tự tính theo thẻ** để tính lại.
- Nhanh nhất: trong kết quả kế hoạch, **bấm vào ô thẻ** (hoặc dòng nhóm, hay nút **＋ Ghi chi tiêu thẻ này** trong phần Theo từng thẻ – nút này cho chọn nhóm) → gõ số tiền hoặc chọn nhanh 100k/200k/500k/1tr/2tr/Còn lại → **Ghi chi tiêu**.
- Bước 4 **Chi tiêu tháng này**: mỗi lần quẹt thẻ, chọn thẻ, nhóm, gõ số tiền (`150k`, `1,5tr`, `2tr5`, `1.200.000`) → **Ghi chi tiêu**. Kế hoạch tự tính lại cho phần còn lại của tháng: đã chi bao nhiêu %, còn chi gì ở thẻ nào, tiền hoàn đã có và dự kiến, tiến độ lên mức, nhóm đã chạm trần, nhóm vượt kế hoạch.
- Khoản đã ghi nằm chung trong lịch sử chi tiêu (bước 2), sang tháng sau dùng "Lấy theo tháng gần nhất" để lập kế hoạch mới.

## Ràng buộc được tính khi lập kế hoạch và theo dõi

- **Số giao dịch tối thiểu** (VD OCB ≥ 7 giao dịch/tháng): chưa đủ thì tiền hoàn của cả kỳ = 0; app hiện tiến độ x/7 và nhắc chia nhỏ khoản chi.
- **Ngưỡng mức theo tổng chi kỳ này** (StepUp, Shinhan, MSB…): tính mức theo tổng đã quẹt + kế hoạch; dưới ngưỡng đầu (VD Shinhan 10tr, MSB Online 3tr) thì tiền hoàn = 0. App báo "cần chi thêm X", và tự dồn chi tiêu sang thẻ đó nếu tổng tiền hoàn tăng.
- **Mức theo chi tiêu kỳ trước** (VIB Cash Back, Family Link): app tự xếp mức theo tổng chi kỳ trước trong lịch sử; chưa có lịch sử thì dùng mức chọn ở bước 1.
- **Nhóm phải đăng ký** (VIB, SHB…): chưa tick nhóm đã đăng ký thì tiền đã quẹt chỉ tính hoàn cơ bản; app nhắc nhóm nên đăng ký.
- **Ưu đãi theo ngày** (ẩm thực cuối tuần Shinhan…): khoản đã ghi tính đúng theo ngày quẹt; kế hoạch tính theo tỷ lệ ngày và ghi rõ "chỉ T7, CN".
- **Giao dịch tối thiểu của nhóm** (Techcombank Everyday: mỗi giao dịch online từ 200k): khoản nhỏ hơn không được hoàn nhóm.
- **Điểm tối thiểu mỗi kỳ** (SHB: từ 100k điểm/kỳ mới ghi nhận): dưới mức thì = 0.
- **Trần nhóm, trần chung, trần cả thẻ, trần năm**: trần năm trừ dần theo tiền hoàn các kỳ trước trong năm.
- **Chưa đủ điều kiện thì chưa tính hoàn**: thẻ thiếu số giao dịch, thiếu chi tiêu tối thiểu hoặc điểm chưa đủ thì "Đã được hoàn" = 0, thẻ hiện "chờ ĐK", và ô "Trong đó chờ đủ điều kiện" tách riêng phần tiền hoàn chưa chắc. Cảnh báo ghi rõ cần chi thêm bao nhiêu, thêm mấy giao dịch.
- **Chu kỳ & phân khúc** (menu trái → Cấu hình → *Chu kỳ & phân khúc thẻ hoàn tiền*, cần mật khẩu quản lý như tab Điều kiện). Cài cho từng dòng thẻ:
  - *Tính hoàn tiền theo*: kỳ sao kê hoặc tháng dương lịch (mặc định theo thể lệ).
  - *Miễn lãi* (45, 50, 55, 60 ngày…, mặc định 45): hạn thanh toán = ngày sao kê của khách + (số ngày miễn lãi − 30). App nhắc khi còn ≤ 7 ngày tới hạn của kỳ có giao dịch.
  - *Phân khúc khách* (VD Premier, Diamond): tên, chi tối thiểu/kỳ, số giao dịch tối thiểu, trần hoàn/kỳ, cách chi để được hoàn. Các số này **thay** điều kiện thông thường của thẻ cho khách thuộc phân khúc đó.
  - **Ngày sao kê do từng khách nhập** khi chọn thẻ (bước 1, bấm vào thẻ; 1–31, 31 = cuối tháng), vì nhiều ngân hàng cho đổi ngày sao kê. Kỳ theo sao kê bắt đầu từ ngày hôm sau; ngày 29–31 tự dồn về cuối tháng ở tháng ngắn. Chưa nhập thì lấy theo thể lệ nếu có.
  - Danh sách thẻ của tôi/của khách: nhập ngày sao kê, **chọn phân khúc**; kiểu chu kỳ và số ngày miễn lãi chỉ xem, không sửa được.
  - Lưu ở khoá `kmt.cbCfg.v1`, có trong file sao lưu toàn bộ.
- **Nhiều thẻ (50+)**: danh sách thẻ gọn theo ngân hàng, lọc nhanh; kế hoạch chỉ xét các thẻ hợp từng loại chi tiêu nên vẫn nhanh (46 thẻ, 1.000 giao dịch: ~0,1 giây); thẻ không dùng trong tháng được gom lại; giao dịch tháng này lọc theo thẻ, hiện 10 khoản mới nhất.

## Hình thẻ

- Ảnh thẻ trong `du-lieu-hoan-tien/hinh-the/<Mã thẻ>.webp`, lấy từ trang chính thức của từng ngân hàng (11/2026), thu nhỏ còn tối đa 400px. Một số ảnh là ảnh quảng cáo có thẻ (MSB, SHB, Techcombank), không phải mặt thẻ phẳng.
- Danh sách thẻ có ảnh nằm ở `CB_IMG` trong `index.html` (giá trị 2 = thẻ dọc, hiện đủ ảnh). Thẻ chưa có ảnh (OCB – web chặn tải ảnh; VPBank Diamond World, Super Shopee, Shopee Platinum, S Rewards) hiện hình vẽ theo màu ngân hàng.
- Thêm ảnh: lưu file `<Mã thẻ>.webp` vào thư mục trên rồi thêm mã thẻ vào `CB_IMG`.

## Kế hoạch cho khách (nút "Kế hoạch cho khách" đầu tab)

Gắn với khách đang chọn (lưu cùng hồ sơ khách):

1. **Thẻ khách đang có** – chọn ngân hàng → dòng thẻ. Thẻ xếp mức theo hạng/gói/lương thì chọn mức của khách; thẻ phải đăng ký nhóm thì tick nhóm đã đăng ký (bỏ trống để app tự chọn nhóm có lợi nhất).
2. **Lịch sử chi tiêu** – mỗi dòng: tháng, thẻ, nhóm chi tiêu, số tiền (triệu).
3. **Nhu cầu tháng tới** – số tiền theo 15 nhóm chi tiêu; "Lấy theo tháng gần nhất" để chép từ lịch sử.

App tính: mỗi nhóm nên quẹt thẻ nào (tối đa tiền hoàn, có tính ngưỡng mức và trần), tiền hoàn theo kế hoạch so với tháng gần nhất, thẻ nào chi thêm bao nhiêu để lên mức, và gợi ý mở thẻ mới (kèm kết quả đủ điều kiện từ tab Kiểm tra). Đây là ước tính: nhóm chi tiêu ghép theo tên nhóm của ngân hàng, phần vượt trần không được hoàn, không tính ưu đãi đối tác riêng.

Dữ liệu theo form mẫu `du-lieu-hoan-tien/mau-hoan-tien.xlsx` (trang Hướng dẫn giải thích từng cột):

| Trang | File CSV |
|---|---|
| Thẻ | `1-the.csv` |
| Nhóm hoàn tiền | `2-nhom-hoan-tien.csv` |
| Trần chung | `3-tran-chung.csv` |
| Loại trừ ngân hàng | `4-loai-tru-ngan-hang.csv` |

Cập nhật: sửa trong Excel → lưu từng trang thành CSV → mở khoá ở tab Điều kiện → tab Hoàn tiền → **Chọn file CSV** (chọn một hoặc nhiều file). App nhận ra file theo tiêu đề cột, đọc được CSV dấu phẩy hoặc dấu chấm phẩy. **Về dữ liệu gốc** để bỏ bản đã nạp. Dữ liệu nạp chỉ lưu trên máy đó.

## Cấu trúc thư mục

```
index.html               ứng dụng (GitHub Pages)
du-lieu-hoan-tien/       form mẫu Excel và 4 file CSV dữ liệu hoàn tiền
icon.png                 biểu tượng trên màn hình chính
logo.svg, logo.png       logo Smart-B
mau-bang-dieu-kien.csv   bảng điều kiện mẫu (có thể Phục hồi từ file này)
```
