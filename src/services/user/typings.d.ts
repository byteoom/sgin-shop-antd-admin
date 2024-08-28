declare namespace API {
    // 用户信息
    interface User {
        id: number; // 用户ID
        uuid: string; // 用户唯一标识
        email: string; // 邮箱
        username: string; // 用户名
        password: string; // 密码
        phone: string; // 手机号
        avatar: string; // 头像
        nickname: string; // 昵称
        status: number; // 状态 0:禁用 1:启用 2:删除
        age: number; // 年龄
        sex: string; // 性别 0:未知 1:男 2:女
        signed: string; // 个性签名
        created_at: string; // 创建时间
        updated_at: string; // 更新时间
        is_deleted: number; // 是否删除 1:删除 0:未删除
    }

}

