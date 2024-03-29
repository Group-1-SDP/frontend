import LogoSVG from "/src/assets/Tickbox Logo White Full.svg";

const Logo = ({ height = "50px" }) => {
  return (
    <img src={LogoSVG} alt="Tickbox Logo. Image of a box with a phone in it." style={{ height: height, width: "auto" }} />
  );
};

export default Logo;
