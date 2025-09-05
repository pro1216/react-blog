import { Header, Footer } from "./Main";
import '../output.css';
import photo from '../assets/abc.jpg';
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

export const About = () => {
  return (
    <body>
      <Header />
      <Intro />
      <IntroTech />
      <Footer />
    </body>
  )
}

export const Intro = () => {
  return (
    <div className="py-8 px-8 max-w-sm  mx-auto space-y-2 bg-white rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6 mb-6">
      <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src={photo} alt="Woman's Face" />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">
            Cipher
          </p>
          <p className="text-slate-500 font-medium">
            <p>神奈川でエンジ

              ニアをやっています。</p>
            <p>主にreactやtypescriptの記事等を更新していく予定です。</p>
            <p>毎週水日更新予定</p>
          </p>
        </div>
      </div>
    </div>

  )
}
export const IntroTech: React.FC = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const labels: string[] = ['Java', 'javascript', 'React', 'Typescript'];
  const numberData: number[] = [3, 3, 1, 1];
  const techData: string[] = ["3年", "3年", "1年", "1年"];
  const data = {
    labels,
    datasets: [
      {
        data: numberData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      },
    ]
  }
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const index = context.dataIndex;
            return `${labels[index]}:${techData[index]}`;
          },
        },
      },
    },
  };

  return (
   <div className="flex-1 pb-16 p-4">
    <div className="py-8 px-8 max-w-sm mx-auto space-y-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6 mb-6">
      <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 py-8 px-4 rounded-lg shadow-md dark:shadow-gray-700">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
          技術の経験年数
        </h2>
        <div className="w-full max-w-md">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
    </div>
  )
}