import LogoSVG from "/src/assets/Tickbox Logo White Full.svg";

const Logo = ({ height = "50px" }) => {
  return (
    <img src={LogoSVG} alt="Logo" style={{ height: height, width: "auto" }} />
  );
};

export default Logo;
