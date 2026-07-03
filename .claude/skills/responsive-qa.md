# Skill: Responsive QA

## Purpose
Kiểm tra responsive đầy đủ trước khi coi 1 page/component là hoàn thành.

## When to use
- Sau khi implement/refactor page hoặc layout component.
- Trước khi merge/deploy.

## Check ở 3 breakpoint
- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px

## Checklist
- [ ] Header: logo icon-only hiển thị đúng, nav desktop ẩn dưới `md`, sticky behavior không giật layout.
- [ ] Mobile bottom navigation: 5 item hiển thị đúng, active state đúng route, không che nội dung cuối trang (`.page-shell` padding-bottom đủ).
- [ ] More bottom sheet: mở/đóng đúng, đóng khi tap ra ngoài, không lỗi scroll khi mở.
- [ ] Floating contact buttons: không đè lên bottom nav ở mobile, vị trí hợp lý ở desktop.
- [ ] Form (Contact): input full-width ở mobile, không overflow ngang, label/placeholder rõ.
- [ ] Trang pháp lý (Privacy/Terms): mục lục sticky hoạt động đúng ở desktop, chuyển thành list thường ở mobile nếu cần.
- [ ] Loading screen: hiển thị đúng giữa màn hình, không giật khi chuyển route.
- [ ] Không có overflow ngang (horizontal scroll) ở bất kỳ breakpoint nào.
- [ ] Touch target ≥ 44px cho mọi nút bấm ở mobile.

## Output
- Ghi nhận lỗi phát hiện (nếu có) + fix trực tiếp hoặc tạo task riêng nếu fix lớn.
