import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Stores.css";

const STORES = [
  {
    country: "India",
    shops: [
      {
        city: "Kochi",
        image: "/assets/Shop_one.png",
        phone: "+91 98765 43210",
        map: "https://maps.google.com/?q=Kochi",
      },
      {
        city: "Calicut",
        image: "/assets/shop_two.png",
        phone: "+91 91234 56789",
        map: "https://maps.google.com/?q=Calicut",
      },
    ],
  },
  {
    country: "Dubai",
    shops: [
      {
        city: "Dubai Mall",
        image: "/assets/Shop_three.png",
        phone: "+971 55 123 4567",
        map: "https://maps.google.com/?q=Dubai Mall",
      },
    ],
  },
];

export default function Stores() {
  const headerRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      rowsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.2,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <section className="apple-stores">
      {/* HEADER */}
      <header ref={headerRef}>
        <h1>Find a store</h1>
        <p>Crafted fragrances. Available across India and Dubai.</p>
        <input type="text" placeholder="Search by city or region" />
      </header>

      {/* STORE LIST */}
      <div className="store-groups">
        {STORES.map((group, i) => (
          <div className="country" key={i}>
            <h2>{group.country}</h2>

            {group.shops.map((shop, j) => (
              <div
                className="store-row"
                key={j}
                ref={(el) => (rowsRef.current.push(el))}
              >
                <img src={shop.image} alt={shop.city} />

                <div className="store-info">
                  <h3>{shop.city}</h3>
                  <a href={`tel:${shop.phone}`}>{shop.phone}</a>
                  <a
                    href={shop.map}
                    target="_blank"
                    rel="noreferrer"
                    className="map-link"
                  >
                    View on map →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
