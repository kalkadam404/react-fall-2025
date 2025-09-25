import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Skill({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <FontAwesomeIcon icon={icon} size="2x" color="#6c757d" />
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl text-[#6c757d] font-semibold">{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default Skill;
