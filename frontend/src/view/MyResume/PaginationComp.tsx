import { Icon } from "@iconify/react";

const PaginationComp = () => {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              <Icon icon="fe:arrow-left" />
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              <Icon icon="fe:arrow-right" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationComp;
