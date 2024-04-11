import { useState, useEffect } from "react";
import { List , MapPinLine } from "@phosphor-icons/react"
import "./styles.scss";

export const Home = () => {
  // const user = JSON.parse(localStorage.getItem('userSignIn'));
  // const googleUser = JSON.parse(localStorage.getItem('googleUserSignIn'));
  useEffect(()=>{
    },[])

  const imagesCarousel =[ 
    'https://gkpb.com.br/wp-content/uploads/2021/11/black-friday-pizza-hut.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk8wmB_aLSqmiS6t_TqRbcECEsD9iFpKEoLOEaA6C0Pw&s',
    'https://www.calenzano.com.br/wp-content/uploads/2024/03/24_02_27_promocoes-10_GiganteEspecial.jpg',
    'https://superpizzapan.com.br/wp-content/uploads/2020/03/AF-SSP-24_018-CAM-Promos-PediuGanhou-553-x-317.jpg',
  ]

    const [current, setCurrent] = useState(0);
    const swipe = { start: 0, end: 0 };
  
    const handleTouchStart = (e) => {
      swipe.start = e.touches[0].clientX;
      console.log(swipe.start)
    };
  
    const handleTouchEnd = (e) => {
      swipe.end = e.changedTouches[0].clientX;
      console.log(swipe.end)
      handleSwipe();
    };
  
    const handleSwipe = () => {
      if (swipe.start - swipe.end > 100) {
        nextSlide();
      } else if (swipe.start - swipe.end < -100) {
        prevSlide();
      }
    };
  
    const nextSlide = () => {
      setCurrent(current === imagesCarousel.length - 1 ? 0 : current + 1);
    };
  
    const prevSlide = () => {
      setCurrent(current === 0 ? imagesCarousel.length - 1 : current - 1);
    };

  return (
    <div className="main-container">
      <span className="top-menu">
        <div>
          <List />
        </div>
      </span>
      <div className="info-container"> 
        <p>
        <MapPinLine/>
        Seu endereço aqui
        </p>
      </div>
      <div className="banners-container" 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}>
        <img src={imagesCarousel[current]} alt={`Slide ${current + 1}`} />
      </div>
      <div className="products-container">
        <div className="itens-container">
          <img src="" alt=""></img>
          <h3>Pizza</h3>
        </div>
        <div className="itens-container">
          <img src="" alt=""></img>
          <h3>Yakisoba</h3>
        </div>
        <div className="itens-container">
          <img src="" alt=""></img>
          <h3>Massas</h3>
        </div>
        <div className="itens-container">
          <img src="" alt=""></img>
          <h3>Refrigerantes</h3>
        </div>
      </div>
      <footer className="footer-container">
        <div className="buttons">
            <img src="" alt=""></img>
        </div>
        <div className="buttons">
            <img src="" alt=""></img>
        </div>
        <div className="buttons">
            <img src="" alt=""></img>
        </div>
        <div className="buttons">
            <img src="" alt=""></img>
        </div>
      </footer>
    </div>
  );
};
    
    // fs.writeFile("vendas.json", JSON.stringify(order), (err) => {
    //   if (err) {
    //     console.log(err);
    //     return response
    //       .status(500)
    //       .json({ error: "Erro ao inserir produto na Base de Dados local" });
    //   } else {
    //     console.log("Produto inserido em Base de Dados local.");
    //     response.send(order);
    //   }
    // });