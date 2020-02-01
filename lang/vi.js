export const transValidation = {
    email_incorrect: "Email phải có dạng example@company.domain !",
    password_incorrect: "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt",
    password_confirmation_incorrect: "Nhập lại mật khẩu chưa chính xác!",
    name_incorrect: "Độ dài tên không đủ",
    content_incorrect: "Độ dài nội dùng không đủ",
    image_incorrect: "Độ dài ảnh không đủ",
    description_incorrect: "Độ dài nội dung không đủ",
    category_incorrect: "Chưa chọn danh mục",
}

export const transErrors = {
    account_in_use: "Email đã được đăng ký !",
    login_failed: "Sai tài khoản hoặc mật khẩu !",
    server_error: "Có lỗi ở phía server, vui lòng thông báo cho bộ phận hỗ trợ. Xin cám ơn.",
    avatar_type: "Kiểu file không hợp lệ.",
    avatar_size: "Ảnh upload tối đa cho phép là 1 MB !",
    user_current_password_failed: "Mật khẩu hiện tại không đúng",
}

export const transSuccess = {
    user_created: (userEmail) => {
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo thành công`
    },
    blog_created: (name) => {
        return `Bài viết <strong>${name}</strong> đã được tạo thành công`
    },
    category_created: (name) => {
        return `Danh mục <strong>${name}</strong> đã được tạo thành công`
    },
    login_success: (userEmail) => {
        return `Xin chào ${userEmail}, chúc bạn một ngày tốt lành.`
    },
    logout_success: "Đăng xuất tài khoản thành công, hẹn gặp lại bạn :)",
    avatar_updated: "Cập nhật thành công.",
    user_info_updated: "Cập nhật thông tin người dùng thành công.",
    blog_updated: "Cập nhật thông tin bài viết thành công."
};