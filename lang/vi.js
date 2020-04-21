export const transValidation = {
    auth: {
        email_incorrect: "Email phải có dạng example@company.domain !",
        password_incorrect: "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt",
        password_confirmation_incorrect: "Nhập lại mật khẩu chưa chính xác!",
        old_password_incorrect: "Mật khẩu cũ không hợp lệ"
    },
    category: {
        name_incorrect: "Độ dài tên không đủ",
        description_incorrect: "Độ dài nội dung không đủ",
    },
    test: {
        question_incorrect: "Độ dài câu hỏi không đủ",
        correctAns_incorrect: "Độ dài đáp án không đủ",
        difficulty_incorrect: "Độ dài độ khó không đủ",
        category_incorrect: "Chưa chọn danh mục",
    },
}

export const transErrors = {
    system: {
        server_error: "Có lỗi ở phía server, vui lòng thông báo cho bộ phận hỗ trợ. Xin cám ơn.",
        object_id_invalid: "Id không hợp lệ"
    },
    auth: {
        account_in_use: "Email đã được đăng ký !",
        login_failed: "Sai tài khoản hoặc mật khẩu !",
        user_current_password_failed: "Mật khẩu hiện tại không đúng",
        account_undefined: "Tài khoản không tồn tại"
    },
    user: {
        avatar_type: "Kiểu file không hợp lệ.",
        avatar_size: "Ảnh upload tối đa cho phép là 1 MB !",
    },
    category: {
        not_found: "Danh mục không tồn tại"
    },
    test: {
        not_found: "Test không tồn tại"
    }
}

export const transSuccess = {
    user: {
        user_created: (userEmail) => {
            return `Tài khoản <strong>${userEmail}</strong> đã được tạo thành công`
        },
        avatar_updated: "Cập nhật thành công.",
        user_info_updated: "Cập nhật thông tin người dùng thành công.",
    },
    category: {
        category_created: (name) => {
            return `Danh mục <strong>${name}</strong> đã được tạo thành công`
        },
        category_updated: (name) => {
            return `Danh mục <strong>${name}</strong> đã được cập nhật thành công`
        },
        category_deleted: (name) => {
            return `Xóa danh mục <strong>${name}</strong> thành công`
        }
    },
    test: {
        test_created: (name) => {
            return `Bài test <strong>${name}</strong> đã được tạo thành công`
        },
        test_updated: (name) => {
            return `Bài test <strong>${name}</strong> đã được cập nhật thành công`
        },
        test_deleted: (name) => {
            return `Xóa bài test <strong>${name}</strong> thành công`
        }
    },
    auth: {
        login_success: (userEmail) => {
            return `Xin chào ${userEmail}, chúc bạn một ngày tốt lành.`
        },
        logout_success: "Đăng xuất tài khoản thành công, hẹn gặp lại bạn :)",
    }
};