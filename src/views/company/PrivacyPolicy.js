import React from "react";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="space-y-6">
      <h1 className="text-[28px] font-semibold">Privacy Policy</h1>

      <p className="font-normal">
        Thank you for accessing the Laptop City website. We respect your privacy
        and want to protect your personal information. To learn more, please
        read this Privacy Policy. <br /> This Privacy Policy explains how we
        collect, use and (under certain conditions) disclose your personal
        information. This Privacy Policy also explains the steps we have taken
        to secure your personal information. Finally, this Privacy Policy
        explains your options regarding the collection, use and disclosure of
        your personal information. By visiting the Site directly or through
        another site, you accept the practices described in this Policy. <br />{" "}
        Data protection is a matter of trust and your privacy is important to
        us. We shall therefore only use your name and other information which
        relates to you in the manner set out in this Privacy Policy. We will
        only collect information where it is necessary for us to do so and we
        will only collect information if it is relevant to our dealings with
        you. <br /> We will only keep your information for as long as we are
        either required to by law or as is relevant for the purposes for which
        it was collected. <br /> You can visit the Site and browse without
        having to provide personal details. During your visit to the Site you
        remain anonymous and at no time can we identify you unless you have an
        account on the Site and log on with your user name and password. <br />{" "}
        The Website Policies and Terms of Use may be changed or updated
        occasionally to meet the requirements and standards. Therefore the
        Customers’ are encouraged to frequently visit these sections in order to
        be updated about the changes on the website. Modifications will be
        effective on the day they are posted.
      </p>

      <section className="space-y-3">
        <h3 className="text-2xl text-gray-700">Data that we collect</h3>

        <p className="font-normal">
          We will use the information you provide to enable us to better provide
          you with the services and information offered through our website and
          which you request. Further, we will use the information you provide to
          administer your account with us; audit the downloading of data from
          our website; improve the layout and/or content of the pages of our
          website and customize them for users; identify visitors on our
          website; carry out research on our users' demographics; send you
          information we think you may find useful or which you have requested
          from us, including information about our products and services,
          provided you have indicated that you have not objected to being
          contacted for these purposes. Subject to obtaining your consent we may
          contact you by email with details of other products and services. If
          you prefer not to receive any marketing communications from us, you
          can opt out at any time. <br /> We may use your personal information
          for opinion and market research. Your details are anonymous and will
          only be used for statistical purposes. You can choose to opt out of
          this at any time. Any answers to surveys or opinion polls we may ask
          you to complete will not be forwarded on to third parties. Disclosing
          your email address is only necessary if you would like to take part in
          competitions. We save the answers to our surveys separately from your
          email address. <br /> We may also send you other information about us,
          the website, our products, sales promotions, our newsletters, anything
          relating to other companies in our group or our business partners. If
          you would prefer not to receive any of this additional information as
          detailed in this paragraph (or any part of it) please click the
          'unsubscribe' link in any email that we send to you. <br /> We may
          further anonymize data about users of the Site generally and use it
          for various purposes, including ascertaining the general location of
          the users and usage of certain aspects of the Site or a link contained
          in an email to those registered to receive them, and supplying that
          anonymized data to third parties such as publishers. However, that
          anonymized data will not be capable of identifying you personally.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl text-gray-700">Third Parties and Links</h3>

        <p className="font-normal">
          We may pass your details to partners to help us with any of our uses
          of your data set out in our Privacy Policy. For example, we may use
          third parties to analyze data and to provide us with marketing
          assistance. We may transfer our databases containing your personal
          information if we sell our business or part of it. Other than as set
          out in this Privacy Policy, we shall NOT sell or disclose your
          personal data to third parties without obtaining your prior consent
          unless this is necessary for the purposes set out in this Privacy
          Policy or unless we are required to do so by law. <br /> The Site may
          contain advertising of third parties and links to other sites or
          frames of other sites. Please be aware that we are not responsible for
          the privacy practices or content of those third parties or other
          sites, nor for any third party to whom we transfer your data in
          accordance with our Privacy Policy. Some of the advertisements you see
          on the Site are selected and delivered by third parties, such as ad
          networks, advertising agencies, advertisers, and audience segment
          providers. These third parties may collect information about you and
          your online activities, either on the Site or on other websites,
          through cookies, web beacons, and other technologies in an effort to
          understand your interests and deliver to you advertisements that are
          tailored to your interests. Please remember that we do not have access
          to, or control over, the information these third parties may collect.
          The information practices of these third parties are not covered by
          this privacy policy. <br /> Laptop City uses Google API Services to
          provide users with content related to products. For more information
          about Google privacy policy visit{" "}
          <Link to="https://policies.google.com/privacy" target="_blank">
            https://policies.google.com/privacy
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl text-gray-700">Security</h3>

        <p className="font-normal">
          We have in place appropriate technical and security measures to
          prevent unauthorized or unlawful access to or accidental loss of or
          destruction or damage to your information. When we collect data
          through the Site, we collect your personal details on a secure server.
          We use firewalls on our servers. We maintain physical, electronic and
          procedural safeguards in connection with the collection, storage and
          disclosure of your information. You are responsible for protecting
          against unauthorized access to your password and to your computer.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl text-gray-700">Your rights</h3>

        <p className="font-normal">
          If you are concerned about your data you have the right to request
          access to the personal data which we may hold or process about you.
          You have the right to require us to correct any inaccuracies in your
          data free of charge. At any stage you also have the right to ask us to
          stop using your personal data for direct marketing purposes.
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
