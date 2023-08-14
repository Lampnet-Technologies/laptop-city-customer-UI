import React from "react";

function TermsOfUse() {
  return (
    <div className="space-y-6 lg:space-y-7">
      <h1 className="text-[28px] font-semibold md:text-[32px] lg:text-[40px]">
        Terms and Conditions of Limited Warranty
      </h1>

      <section id="warranty" className="space-y-4">
        <h3 className="text-2xl text-gray-700 lg:text-[28px]">
          Warranty Period
        </h3>
        <div className="px-4">
          <ol className="font-normal list-decimal space-y-2 lg:text-lg lg:leading-[30px]">
            <li>
              Purchases of brand-new items from Laptop City are covered by the
              standard manufacturer's warranty and conditions, which can be
              redeemed at manufacturer's warranty/service locations inside and
              outside of Nigeria as applicable. Depending on the brand, this
              lasts for between 12 and 24 months.
            </li>
            <li>
              Used products from Laptop city come with a full year of warranty
              coverage and a 14-day replacement window, after which we will
              provide after-sale support for the product. If a product is
              discovered to be defective and the problem is not caused by misuse
              or damage from the user, it is covered.
            </li>
            <li>
              In the event that a brand-new or used item is determined to have a
              hardware manufacturer’s flaw or fault upon physical inspection,
              Laptop City maintains the right to replace the item at its sole
              discretion. If reported within 14 days of the purchase date, this
              is redeemable. Accessories included with the device cannot be
              replaced; only the flawed gadget can be.
            </li>
            <li>
              Laptop City accessories come with a 7-day warranty. If a product
              is proven to be flawed and the problem is not the consequence of
              the user's negligence or improper use, the product is covered.
            </li>
            <li>
              The Limited Warranty only covers software problems or
              manufacturing defects in a gadget. For a physical damages, we
              offer a damage protections plan which must be purchased by the
              customer to be eligible for free repairs.
            </li>
          </ol>
        </div>
      </section>

      <section id="refund" className="space-y-4">
        <h3 className="text-2xl text-gray-700 lg:text-[28px]">
          Returns and Refunds
        </h3>

        <div className="space-y-3 font-normal lg:text-lg lg:leading-[30px]">
          <p>
            Returns of products by buyers will be handled by us, and we reserve
            the right to accept returns if they comply with the laws of the
            territory that are in effect.
          </p>
          <p>
            If we are unable to fix or replace the defective product, refunds
            for used goods will be given. Only defective items may be returned
            or refunded. We reserve the right to impose our return/refund
            policies, subject to any applicable laws of the territory.
          </p>
          <p>
            In our discretion, we may offer refunds for the product price;
            domestic and/or international shipping costs; and by way of store
            credit coupons, mobile money transfer, bank transfers, or other
            means we may choose from time to time.
          </p>
          <p>Laptop City will accept returned goods and issue refunds.</p>
          <p>
            Any changes to our refunds or returns policy will take effect for
            all purchases made after the change is published on our website.
          </p>
        </div>
      </section>
    </div>
  );
}

export default TermsOfUse;
