import "./Banner.scss";

const Banner = () => {
  return (
    <div className="banner">
      <video
        className="banner-video"
        src="/banner.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="overlay">
        <h1>From Italian delights to irresistible desserts,</h1>
        <p  style = {{color:"#e23744" , fontWeight:"900"}}> we’ve got you covered</p>
      </div>
    </div>
  );
};

export default Banner;
