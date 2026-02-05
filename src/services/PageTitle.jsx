import { Helmet } from "react-helmet-async";

export default function PageTitle({ title, }) {
  return (
    <Helmet>
      <title>Eriel愛莉兒｜{title}</title>
      <meta name="description" content="我們冰淇淋都是手工製作，持續開發新口味，每天供應 10 ~14 種，很多都是在心情差的時候想出來，希望你吃完也能變得開心~ 添加膠原蛋白來取代穩定劑，低脂低熱量!" />
    </Helmet>
  );
}
