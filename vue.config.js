module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    devServer: {
      // proxy: {
      //   '/api': {
      //     target: 'http://192.168.3.6:3000/',
      //     changOrigin: true
      //   }
      // }
      before(app) {
        app.get('/api/login', function(req, res){
          console.log(req);
          const {username, password} = req.query;
          
          if(username === '11' && password === '11') {
            res.json({
              code: 1,
              token: '123'
            })
          } else {
            res.status(401).json({ code:0, message: '错误'})
          }
        })

        // 保护接口中间件
        function auth(req, res, next) {
          if (req.headers.Authorization) {
            // 已认证
            next()
          } else {
            // 用户未授权
            res.sendStatus(401)
          }
        }
        
        // 获取登录用户信息
        app.get("/api/userinfo", auth, function(req, res) {
          res.json({ code: 1, data: { name: "tom", age: 20 } });
        });

        // mall数据
        app.get("/api/goods", function(req, res) {
          res.json({
            code: 1,
            slider: [
              {
                id: 21,
                img: "/img/01.jpg"
              },
              {
                id: 22,
                img: "/img/02.jpg"
              },
              {
                id: 23,
                img: "/img/03.jpg"
              },
              {
                id: 24,
                img: "/img/04.jpg"
              }
            ],
            data: {
              a: [
                {
                  id: 1,
                  title: "三只松鼠",
                  price: "100",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 2,
                  title: "衣服",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 100
                },
                {
                  id: 3,
                  title: "华为Mate30Pro",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 4,
                  title: "外套",
                  price: "110",
                  img: "/img/04.jpg",
                  count: 100
                },
                {
                  id: 5,
                  title: "电器",
                  price: "200",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 6,
                  title: "家居服",
                  price: "30",
                  img: "/img/05.jpg",
                  count: 100
                }
              ],
              b: [
                {
                  id: 7,
                  title: "格力空调",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 101
                },
                {
                  id: 8,
                  title: "农夫山泉",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 9,
                  title: "冰箱",
                  price: "110",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 10,
                  title: "洗衣机",
                  price: "200",
                  img: "/img/04.jpg",
                  count: 100
                }
              ],
              c: [
                {
                  id: 11,
                  title: "电脑",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 12,
                  title: "显示器",
                  price: "110",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 13,
                  title: "衣橱",
                  price: "30",
                  img: "/img/04.jpg",
                  count: 100
                }
              ],
              d: [
                {
                  id: 14,
                  title: "电磁炉",
                  price: "200",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 15,
                  title: "电饭锅",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 100
                },
                {
                  id: 16,
                  title: "拖把",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                }
              ],
              e: [
                {
                  id: 17,
                  title: "笔",
                  price: "100",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 18,
                  title: "包包",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 100
                },
                {
                  id: 19,
                  title: "裤子",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 20,
                  title: "秋裤",
                  price: "110",
                  img: "/img/05.jpg",
                  count: 100
                }
              ]
            },
            keys: ["a", "b", "c", "d", "e"]
          });
        });
      }
    }
  }
}
