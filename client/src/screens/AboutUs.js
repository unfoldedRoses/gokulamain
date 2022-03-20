import React from "react";

const AboutUs = () => {
  return (
    <div className="mx-md-5 mx-sm-2 text-center px-md-5 my-md-5 py-md-5">
      <h1>About Us</h1>
      {/* <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        autem suscipit harum, consequatur nulla incidunt possimus facilis
        quaerat nam vel earum nesciunt, magnam laboriosam
      </p> */}
      <img
        style={{
          width: "100%",
          objectFit: "contain",
        }}
        src="/images/banner.jpg"
        alt="banner"
      />
    </div>
  );
};

export default AboutUs;
