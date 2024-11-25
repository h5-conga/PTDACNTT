import React, { useState } from "react";
import styles from './NhapTTBenhNhan.module.css'

const NhapTTBenhNhan = () => {
    const [benhNhan, setBenhNhan] = useState({
        name: '',
        dob: '',
        gender: '',
        ethnic: '',
        phone: '',
        address: '',
        cIN: '',
        hIN: '',
        benhAn: []
    });
    const [hienThi, setHienThi] = useState(false);
    const [thongTinHienThi, setThongTinHienThi] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBenhNhan({ ...benhNhan, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const phoneRegex = /^0\d{9}$/;
        const cINRegex = /^0\d{11}$/;
        const hINRegex = /^(GD|TE|HS|SV)[1-5]\d{11}$/;
        const todayString = (new Date()).toISOString().split('T')[0];

        if (benhNhan.dob >= todayString){
            alert("Ngày sinh không hợp lệ");
            return;

        }else if (!phoneRegex.test(benhNhan.phone)) {
            alert("Số điện thoại không hợp lệ! (Yêu cầu 10 ký tự bắt đầu bằng 0)");
            return;
        }else if (!cINRegex.test(benhNhan.cIN)) {
            alert("Căn cước công dân không hợp lệ! (Yêu cầu 12 ký tự bắt đầu bằng 0)");
            return;
        }else if (isChecked && !hINRegex.test(benhNhan.hIN)) {
            alert("Mã số bảo hiểm y tế không hợp lệ! (Yêu cầu GD/TE/HS/SV + số 1-5 + 11 ký tự số)");
            return;
        }
        setThongTinHienThi(benhNhan);
        setHienThi(true);
    };    


    const handleChangeCheckBox = () => {
        setIsChecked(!isChecked);
    };

    const [isChecked, setIsChecked] = useState(false);
    const closeHienThi = () => {
        setHienThi(!hienThi);
    };

    const handleConfirm = async () => {
        // setLoading(true); // Start loading

        // // Send data to the server using fetch or axios
        // try {
        //     const response = await fetch('http://yourapiendpoint.com/api/benhnhan', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(benhNhan), // Send the data in the request body
        //     });

        //     if (response.ok) {
        //         const result = await response.json();
        //         setSuccessMessage("Dữ liệu đã được lưu thành công!");
        //         setThongTinHienThi(null); // Clear the displayed info
        //         setBenhNhan({
        //             name: '',
        //             dob: '',
        //             gender: '',
        //             ethnic: '',
        //             phone: '',
        //             address: '',
        //             cIN: '',
        //             hIN: '',
        //         }); // Reset the form
        //     } else {
        //         setSuccessMessage("Có lỗi xảy ra. Vui lòng thử lại.");
        //     }
        // } catch (error) {
        //     setSuccessMessage("Có lỗi xảy ra. Vui lòng thử lại.");
        // } finally {
        //     setLoading(false); // Stop loading
        // }
    };

    return (
        <div className={styles.bigdiv}>
        <div className={styles.cont} >
            <h3 style={{ textAlign: 'center', paddingBottom:"20px" }}>Nhập thông tin bệnh nhân</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>Họ và tên:</label></td>
                                <td>
                                    <input className={styles.in} type="text" name="name" value={benhNhan.name} onChange={handleChange} required />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Ngày tháng năm sinh:</label></td>
                                <td>
                                    <input type="date" name='dob' value={benhNhan.dob} onChange={handleChange} required />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Giới Tính:</label></td>
                                <td>
                                    <select name="gender" value={benhNhan.gender} onChange={handleChange} required>
                                        <option value="">Chọn giới tính</option>
                                        <option value="nam">Nam</option>
                                        <option value="nữ">Nữ</option>
                                        <option value="khác">Khác</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Dân tộc:</label></td>
                                <td>
                                    <input className={styles.in} type="text" name="ethnic" value={benhNhan.ethnic} onChange={handleChange} required />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Số Điện Thoại:</label></td>
                                <td>
                                    <input className={styles.in} type="tel" name="phone" value={benhNhan.phone} onChange={handleChange} required />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Địa Chỉ:</label></td>
                                <td>
                                    <input className={styles.in} type="text" name="address" value={benhNhan.address} onChange={handleChange} required />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Số Căn Cước Công Dân:</label></td>
                                <td>
                                    <input className={styles.in} type="text" name="cIN" value={benhNhan.cIN} onChange={handleChange} required maxLength={12} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" checked={isChecked} onChange={handleChangeCheckBox} />
                                    <label>Mã số bảo hiểm y tế:</label>
                                </td>
                                <td>
                                    {isChecked && (
                                        <input className={styles.in} type="text" name="hIN" value={benhNhan.hIN} onChange={handleChange} required maxLength={15} />
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.btn_con}><button type="submit" className={styles.btn}>Lưu</button></div>
            </form>
            {hienThi && (
                <div className={styles.hienThi_nhap}>
                    <div className={styles.hienThi_nhap_content} style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
                        <div className={styles.header_content}>
                            <h3 style={{ textAlign: "center" }}>Thông tin bệnh nhân đã lưu</h3>
                            <span className={styles.close_btn} onClick={closeHienThi}>&times;</span>
                        </div>
                        <div className={styles.center_content}>
                            <p><strong>Họ và tên:</strong> {thongTinHienThi.name}</p>
                            <p><strong>Ngày tháng năm sinh:</strong> {thongTinHienThi.dob}</p>
                            <p><strong>Giới Tính:</strong> {thongTinHienThi.gender}</p>
                            <p><strong>Dân tộc:</strong> {thongTinHienThi.ethnic}</p>
                            <p><strong>Số Điện Thoại:</strong> {thongTinHienThi.phone}</p>
                            <p><strong>Địa Chỉ:</strong> {thongTinHienThi.address}</p>
                            <p><strong>Số Căn Cước Công Dân:</strong> {thongTinHienThi.cIN}</p>
                            {thongTinHienThi.hIN && (
                                <p><strong>Mã số bảo hiểm y tế:</strong> {thongTinHienThi.hIN}</p>
                            )}
                        </div>
                        <div className={styles.btn_con}>
                            <button className={styles.btn} onClick={closeHienThi}>Hủy</button>
                            <button className={styles.btn} onClick={handleConfirm}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default NhapTTBenhNhan;