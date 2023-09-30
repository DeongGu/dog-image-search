const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "none",

  //엔트리
  //웹펙에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로
  //웹 애플리케이션의 전반적인 구조와 내용
  entry: "./src/App.js",

  //아웃풋
  //결과물의 파일 경로
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  devServer: {
    port: 8000,
    historyApiFallback: true,
    //HMR은 브라우저를 새로 고치지 않아도 웹팩으로 빌드한 결과물이 웹 애플리케이션에 실시간으로 반영될 수 있게 도와주는 설정
    hot: true,

    //서버에 콘텐츠를 제공할 위치
    static: {
      directory: path.join(__dirname, "public"),
    },
    proxy: {},
  },

  //로더
  //웹팩이 웹 애플리케이션을 해석할 때 자바스크립트 파일이 아닌 웹 자원(HTML, CSS, Images, 폰트 등)들을 변환할 수 있도록 도와주는 속성
  //파일을 해석하고 변환하는 과정에 관여
  module: {
    rules: [
      {
        //로더를 적용할 파일 유형
        test: /\.css$/,

        //해당 파일에 적용할 로더의 이름
        //오른쪽에서 왼쪽 순으로 적용
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              fallback: require.resolve("file-loader"),
            },
          },
        ],
      },

      {
        test: /\.txt$/,
        use: "raw-loader",
      },
    ],
  },

  //플러그인
  //웹펙의 기본적인 동작에 추가적인 기능을 제공하는 속성
  //해당 결과물의 형태를 바꾸는 역할
  plugins: [
    //웹펙으로 빌드한 결과물로 HTML파일을 생성해주는 플러그인
    new HtmlWebpackPlugin({
      // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
      template: "./index.html",
    }),

    //웹펙의 빌드 진행율을 표시해주는 플러그인
    new webpack.ProgressPlugin(),
  ],
};
