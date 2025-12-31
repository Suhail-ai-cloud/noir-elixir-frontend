import "./RefundPolicy.css";

export default function RefundPolicy() {
  return (
    <section className="policy-wrapper">
      <div className="policy-container">
        <h1>Refund & Return Policy</h1>

        <p className="policy-intro">
          Fragrances are personal-use products. For hygiene, safety, and quality
          reasons, we do not accept returns or issue refunds once an order is placed.
        </p>

        <ul className="policy-list">
          <li>All perfumes are non-returnable and non-refundable</li>
          <li>Opened, used, or tested products cannot be returned</li>
          <li>Refunds are not provided for personal scent preferences</li>
          <li>
            Product color or packaging may vary slightly due to lighting and
            production batches
          </li>
          <li>Orders once confirmed cannot be cancelled or modified</li>
        </ul>

        <div className="policy-note">
          <h3>Damaged Delivery Notice</h3>
          <p>
            In rare cases of visible transit damage, customers must contact us
            within <strong>24 hours of delivery</strong> with clear photo or video
            proof. Requests are reviewed on a case-by-case basis.
          </p>
        </div>

        <p className="policy-confirmation">
          By placing an order, you confirm that you have read, understood, and
          agreed to this policy.
        </p>
      </div>
    </section>
  );
}
