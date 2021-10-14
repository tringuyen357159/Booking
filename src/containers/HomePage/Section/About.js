import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';
import { FormattedMessage } from 'react-intl';

class About extends Component {

   

    render() {

        return (
           <>
                <div className="about">
                    <div className="section-about container">
                        <div className="section-about-content">
                            <div className="section-about-content__header">
                                Truyền thông nói về BookingCare
                            </div>
                            <div className="section-about-content__item">
                                <div className="section-about-content__item--left">
                                    <iframe width="600" height="400" src="https://www.youtube.com/embed/E2rsb3-5JlM" 
                                        title="YouTube video player" 
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen>                               
                                    </iframe>
                                </div>

                                <div className="section-about-content__item--right">
                                    Vụ Truyền thông và Thi đua, khen thưởng là vụ tổng hợp thuộc Bộ Y tế, 
                                    có chức năng tham mưu giúp Bộ trưởng Bộ Y tế thực hiện 
                                    quản lý về hoạt động truyền thông, giáo dục sức khoẻ; 
                                    cung cấp thông tin y tế; quản lý báo chí, xuất bản và công tác thi đua, 
                                    khen thưởng trong ngành y tế.
                                    <br/>
                                    <br/>
                                    Tối 25/9, chuyên cơ chở Chủ tịch nước 
                                    Nguyễn Xuân Phúc cùng Đoàn đại biểu cấp cao Việt Nam đã hạ cánh xuống 
                                    Sân bay quốc tế Nội Bài (Hà Nội), kết thúc tốt đẹp chuyến thăm chính thức Cu-ba, 
                                    tham dự Phiên thảo luận chung cấp cao Khoá 76 Đại Hội đồng Liên hợp quốc và thực 
                                    hiện các hoạt động song phương tại Hoa Kỳ từ ngày 18 - 24/9.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
