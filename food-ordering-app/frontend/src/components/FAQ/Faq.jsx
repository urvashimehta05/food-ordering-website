import { useState } from "react";
import "./Faq.scss";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "How do I place an order?",
      a: "Browse the menu, add items to your cart, and checkout to place an order."
    },
    {
      q: "Do I need an account to order?",
      a: "Yes, an account is required to place orders and track them."
    },
    {
      q: "How can I track my order?",
      a: "You can track your order from the Orders section after logging in."
    },
    {
      q: "Can I cancel my order?",
      a: "Orders can be cancelled only before preparation begins."
    },
    {
      q: "Are there delivery charges?",
      a: "Delivery charges depend on distance and order value."
    },
    {
      q: "Is payment secure?",
      a: "Yes, all transactions are processed securely."
    }
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <h2>Frequently Asked Questions</h2>

      {faqs.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${activeIndex === index ? "active" : ""}`}
          onClick={() => toggleFaq(index)}
        >
          <div className="faq-question">
            <h4>{item.q}</h4>
            <span>{activeIndex === index ? "−" : "+"}</span>
          </div>

          {activeIndex === index && (
            <p className="faq-answer">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
