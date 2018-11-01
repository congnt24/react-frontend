import React from 'react';
import Slider from "react-slick";
import {Image} from 'semantic-ui-react';
import {fetchBannerAction} from "../duck/actions";

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", right: '-20px', 'marginRight': '20px', 'zIndex': '1'}}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", left: '-20px', 'marginLeft': '20px', 'zIndex': '1'}}
            onClick={onClick}
        />
    );
}

class BannerHome extends React.Component {
    constructor(props) {
        super(props);
        handleSSR(() => {
            this.props.dispatch(fetchBannerAction('home_slideshow'))
        });
    }

    render() {
        let settings = {
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 500,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            className: "center",
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow/>
        };
        let banners = this.props.banners.map(bn => {
            return (
                <div key={bn.id}>
                    <Image centered src={bn.thumbnail_url} alt={bn.name}/>
                </div>
            )
        });

        return (
            <Slider {...settings}>
                {banners}
            </Slider>
        );
    }
    componentDidMount(){
        // this.props.dispatch(fetchBannerAction('home_slideshow'))
    }
}

export default BannerHome;
