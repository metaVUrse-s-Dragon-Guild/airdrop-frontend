import React, { useEffect } from "react";
import "./faq.scss";
import faq from "../../assets/faq/plus.svg";
import { Column, H2, Header } from "../../components";

const Faq = () => {
  useEffect(() => {
    // select all accordion items
    const accItems = document.querySelectorAll(".accordion__item");

    // add a click event for all items
    accItems.forEach((acc) => acc.addEventListener("click", toggleAcc));

    function toggleAcc() {
      // remove active class from all items exept the current item (this)
      accItems.forEach((item) =>
        item !== this ? item.classList.remove("accordion__item--active") : null
      );

      // toggle active class on current item
      if (this.classList !== "accordion__item--active") {
        this.classList.toggle("accordion__item--active");
      }
    }
  }, []);
  return (
    <div className="faq-page">
      <Header />
      <Column center className="faq">
        <H2 text="FAQ" className="accordion__heading" />

        <div className="accordion__item">
          <button className="accordion__btn">
            <span className="accordion__caption">
              <i className="far fa-lightbulb"></i> What is the Northern Lights
              Project?
            </span>
            <img src={faq} alt="plus" className="accordion__icon" />
          </button>

          <div className="accordion__content">
            <p>
              {" "}
              Decentralised energy markets require a decentralised Token. The
              Northern Lights team has recognized the power of decentralisation
              within the financial markets and seeks to leverage this
              revolutionary technology within another decentralised market, the
              Northern European energy markets.
            </p>
          </div>
        </div>

        <div className="accordion__item">
          <button className="accordion__btn">
            <span className="accordion__caption">
              <i className="far fa-lightbulb"></i>What is Northern Lights Token?
            </span>
            <img src={faq} alt="plus" className="accordion__icon" />
          </button>

          <div className="accordion__content">
            <p>
              Northern Light Token (“NLT”) is a governance token for the
              Northern Lights Project. It is ERC20 compatible and issued on the
              Ethereum (ETH) blockchain.
            </p>
          </div>
        </div>

        <div className="accordion__item">
          <button className="accordion__btn">
            <span className="accordion__caption">
              <i className="far fa-lightbulb"></i>What jurisdictions are
              eligible to participate in the sale?
            </span>
            <img src={faq} alt="plus" className="accordion__icon" />
          </button>

          <div className="accordion__content">
            <p>
              The auction and sale are only available to non-US and non-China
              residents, and residents of nonprohibited jurisdictions.
              “Prohibited Jurisdiction” means any of Cuba, Democratic People’s
              Republic of Korea (North Korea), the Government of Venezuela, Iran
              or Syria.
            </p>
          </div>
        </div>

        <div className="accordion__item">
          <button className="accordion__btn">
            <span className="accordion__caption">
              <i className="far fa-lightbulb"></i>Why are you running your token
              sale in more than one round?
            </span>
            <img src={faq} alt="plus" className="accordion__icon" />
          </button>

          <div className="accordion__content">
            <p>
              Instead of doing one large sale at the beginning of the project,
              we decided it was more responsible to conduct the sale in two
              rounds (Presale & Public Sale), as we can prove our ability to
              deliver on our promises with each subsequent post sale period.
            </p>
          </div>
        </div>

        <div className="accordion__item">
          <button className="accordion__btn">
            <span className="accordion__caption">
              <i className="far fa-lightbulb"></i>Who wrote the code for the
              token sale?
            </span>
            <img src={faq} alt="plus" className="accordion__icon" />
          </button>

          <div className="accordion__content">
            <p>
              The code for the sale was created by the Kleros team and was
              audited by an extensive bounty program. Eight people participated
              in the audit.
            </p>
          </div>
        </div>

        <div className="accordion__item">
          <button className="accordion__btn">
            <span className="accordion__caption">
              <i className="far fa-lightbulb"></i>Which currency can I use for
              my contribution?
            </span>
            <img src={faq} alt="plus" className="accordion__icon" />
          </button>
          <div className="accordion__content">
            <p> The sale only accepts contributions in Ether (ETH).</p>
          </div>
        </div>
        <div className="accordion__item">
          <button className="accordion__btn">
            <span className="accordion__caption">
              <i className="far fa-lightbulb"></i> I contributed to the Presale,
              when will I receive my NLT?
            </span>
            <img src={faq} alt="plus" className="accordion__icon" />
          </button>
          <div className="accordion__content">
            <p>
              Tokens sold in the Presale are locked for a period of 6 months
              after completion of the Presale. The tokens will be freely
              tradable after the lock up period has expired.
            </p>
          </div>
        </div>

        <div className="accordion__item">
          <button className="accordion__btn">
            <span className="accordion__caption">
              <i className="far fa-lightbulb"></i> Where can I trade NLT?
            </span>
            <img src={faq} alt="plus" className="accordion__icon" />
          </button>
          <div className="accordion__content">
            <p>
              The token will be initially traded on the following decentralized
              Exchange: Uniswap
            </p>
          </div>
        </div>
        <div className="accordion__item">
          <button className="accordion__btn">
            <span className="accordion__caption">
              <i className="far fa-lightbulb"></i> I love the project. How can I
              help?
            </span>
            <img src={faq} alt="plus" className="accordion__icon" />
          </button>
          <div className="accordion__content">
            <p>
              There are different ways for you to contribute to the justice
              revolution. Are you a coder? Take a look at our{" "}
              <a href="https://github.com/Northern-Lights-Token">Github</a>. We
              are also actively seeking for pilot opportunities. If you think
              you can help with this, please send us a message from our website.
              If you want to join the community, come to this{" "}
              <a href="https://discord.com/invite/ED2sQFhFdw">Discord</a>.
            </p>
          </div>
        </div>

        <div className="accordion__item">
          <button className="accordion__btn">
            <span className="accordion__caption">
              <i className="far fa-lightbulb"></i> Where Can I Find Out More?
            </span>
            <img src={faq} alt="plus" className="accordion__icon" />
          </button>
          <div className="accordion__content">
            <p>
              Join the announcement channel on Telegram. Visit our{" "}
              <a href="https://www.northernlightstoken.com/">website</a>. Follow
              us on <a href="https://twitter.com/NL_Token">Twitter</a>. Join our{" "}
              <a href="https://discord.com/invite/ED2sQFhFdw">Discord</a> for
              developer conversations. Contribute on{" "}
              <a href="https://github.com/Northern-Lights-Token">Github</a>.
              Download our{" "}
              <a href="https://static1.squarespace.com/static/6217f27320019a4ca5977c5f/t/62306c619d2fa86b87ace844/1647340650381/NL_Whitepaper_March22.pdf">
                whitepaper
              </a>
              .
            </p>
          </div>
        </div>
      </Column>
    </div>
  );
};

export default Faq;
