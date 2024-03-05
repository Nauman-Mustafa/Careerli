import { useEffect, useMemo, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import useFetch from "use-http";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function epochToJsDate(ts: any): String {
  return new Date(ts * 1000).toLocaleDateString("en-US");
}

const BillingDetails = ({ list }: any) => {
  const [invoiceListLoad, setinvoiceListLoad] = useState(false);
  const { response, post, get, loading, data: repos } = useFetch();
  const [invoiceListRef, setinvoiceListRef] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserInvoices();
  }, []);
  const getUserInvoices = async () => {
    const res = await get("subscription/list-invoices");

    setinvoiceListRef(res?.data?.data);
    setinvoiceListLoad(false);
  };
  const tableData = useMemo(() => {
    if (invoiceListRef?.length < 1) {
      return [];
    } else {
      return invoiceListRef?.map((billing: any) => {
        const card = billing?.payment_intent?.payment_method?.card;
        return {
          id: 1,
          Invoice: `${billing.id.substring(0, 12)}`,
          date: `${epochToJsDate(billing.created)}`,
          amount: `${formatter.format(billing.amount_paid / 100)}`,
          status: billing.paid ? "Approved" : "Declined",
          receipt_url: billing.hosted_invoice_url,
          paymentString: `${card?.brand.toUpperCase()} ending in ${
            card?.last4
          }`,
        };
      });
    }
  }, [invoiceListRef]);

  if (invoiceListLoad === true) {
    return (
      <>
        <div className="tables">
          <Table striped hover>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Reciept</th>
              </tr>
            </thead>
            <tbody className="table__body">
              <tr>
                <td className="text-center">Loading</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </>
    );
  } else {
    return (
      <div className="tables">
        <Table striped hover>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Reciept</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {tableData?.length < 1 ? (
              <tr>
                <td className="text-center">Nothing Billed yet</td>
              </tr>
            ) : (
              <>
                {tableData?.map((item: any, index: any): any => (
                  <tr key={`list-${index}`}>
                    <td>{item?.Invoice}</td>
                    <td>{item?.date}</td>
                    <td>{item?.amount}</td>
                    <td>{item?.paymentString}</td>
                    <td>{item?.status}</td>
                    <td>
                      <button onClick={() => window.open(item.receipt_url)}>
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default BillingDetails;
