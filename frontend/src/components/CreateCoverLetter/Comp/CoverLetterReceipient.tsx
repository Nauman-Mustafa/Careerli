// @ts-ignore
const CoverLetterReceipient = () => {
  return (
    <div className="box-body">
      <form>
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <div className="form-input">
                <label>Title</label>
                <select className="form-control">
                  <option>Mr.</option>
                  <option>Ms.</option>
                  <option>Mrs.</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="form-group">
              <div className="form-input">
                <label>First Name</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="form-group">
              <div className="form-input">
                <label>Last Name</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="form-group">
              <div className="form-input">
                <label>Company Name</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="form-group">
              <div className="form-input">
                <label>Position Held</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="form-group">
              <div className="form-input">
                <label>
                  Company Address
                  <span>(Optional)</span>
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="form-group">
              <div className="form-input">
                <label>
                  Postal Code
                  <span>(Optional)</span>
                </label>
                <input type="number" className="form-control" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CoverLetterReceipient;
