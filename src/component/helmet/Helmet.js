function Helmet(props) {
  document.title = "Brand - " + props.title;
  return <div className="w-100">{props.children}</div>;
}
export default Helmet;
