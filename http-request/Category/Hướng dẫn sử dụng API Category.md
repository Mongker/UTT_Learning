# Các api xử lý nghiệp vụ Category

## 1. API Get

> API này không cần là API public không cần kiểm tra gì cả

+ URl: `http://103.81.84.214:2020/api/category-v2`
+ DỮ liệu body đẩy lên: không;

## 2. API POST

> API này cần kiểm tra tài khoản đã đăng nhập hay chưa và quyền được cấp cho tài khoản đó

+ URL: http://103.81.84.214:2020/api/category-v2
+ Dữ liệu body đẩy lên:

```json
{
    "rootId": "1",
    "status": "1",
    "name": "svss",
    "description": "1111",
    "icon": "sssss",
}
```


| Tên        | Nghiệp vụ                                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| rootId      | Là id của category cha, nếu không có category id cha thì sử dụng "1"                                                                   |
| status      | category không được phép xóa nên thuộc tính này sinh ra để care việc đó.<br />Trường hợp "1" là chưa xóa và ngược lại |
| name        | Tên của category đó                                                                                                                        |
| description | Chú thích của category đó                                                                                                                 |
