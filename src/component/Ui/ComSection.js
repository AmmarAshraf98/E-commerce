import { Container } from "react-bootstrap";
import "../style/ComSection.css";
function ComSection(props) {
  return (
    <section className="ComSection">
      <Container className="text-center">
        <h2>{props.title}</h2>
      </Container>
    </section>
  );
}
export default ComSection;
