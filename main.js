const client = new OSS({
    region: "oss-cn-hangzhou",
    accessKeyId: "LTAI5tHUs3N3GQjLpGAdWm7S",
    accessKeySecret: "QpJyqHBDuSijAT2WUwefuTUPswdspE",
    bucket: "imgform",
});

// 首次存储数据函数
async function storeDataForFirstTime() {
    try {
        const objectKey = "travelPlanData.json"; // 存储的文件名

        // 将数组转为JSON字符串
        const jsonString = JSON.stringify(travelPlanData);

        // 上传到OSS
        const result = await client.put(
            objectKey,
            new OSS.Buffer(jsonString)
        );

        console.log("数据首次存储成功:", result);
        console.log("文件URL:", result.url);

        return result;
    } catch (error) {
        console.error("首次存储失败:", error);
        throw error;
    }
}

// 调用函数
// storeDataForFirstTime();

// 绍兴相关诗句
const poems = [
    "山阴道上行，如在镜中游",
    "兰亭临帖续，剡溪放船回",
    "沈园柳暗花遮，沾衣欲湿杏花雨",
    "剡溪蕴秀，山水清华",
    "绍兴山水清丽，人杰地灵",
    "东南形胜，三吴都会",
    "鉴湖三百里，菰蒲无际",
    "会稽山好，禹穴佳",
    "兰亭修禊事，当时坐上皆豪士",
    "曲水流觞，诗酒风流",
    "鲁镇风光旧，沈园故事新",
    "东南佳丽地，山水旧曾游",
    "鉴湖春水碧于天，两岸人家接画船",
    "绍兴酒香千年，越地风流万古",
    "兰亭集序传千古，曲水流觞醉春风",
    "会稽山下好风光，鉴湖春色醉人肠",
    "越王勾践卧薪尝胆，绍兴古城见证沧桑",
    "兰亭雅集传千古，曲水流觞醉春风",
    "绍兴古城千年韵，水乡风情万古长",
    "鉴湖春色醉人心，兰亭雅集传千古",
    "沈园柳色新，曲水流觞醉",
    "会稽山下好风光，鉴湖春色醉人肠",
    "兰亭修禊事，当时坐上皆豪士",
    "剡溪放船回，山水清华处",
    "绍兴古城韵，水乡风情长",
    "鉴湖春水碧，两岸人家画",
    "兰亭集序传，曲水流觞醉",
    "会稽山下好，鉴湖春色新",
];

// 加载动画脚本
document.addEventListener("DOMContentLoaded", function () {
    const poemContainer = document.getElementById("poemContainer");
    const loadingOverlay = document.getElementById("loadingOverlay");

    // 同时显示的诗句数量
    const maxPoems = 6;
    let activePoems = 0;

    // 创建诗句元素并随机位置
    function createPoem() {
        if (activePoems >= maxPoems) return;

        const poem = poems[Math.floor(Math.random() * poems.length)];
        setTimeout(() => {
            if (poemContainer) {
                const poemElement = document.createElement("div");
                poemElement.className = "poem";
                poemElement.textContent = poem;

                // 随机选择运动方向（0: 左下到右上, 1: 右下到左上, 2: 左上到右下, 3: 右上到左下）
                const direction = Math.floor(Math.random() * 4);
                let startX, startY, endX, endY;

                switch (direction) {
                    case 0: // 左下到右上
                        startX = Math.random() * 40; // 0-40%
                        startY = 60 + Math.random() * 40; // 60-100%
                        endX = 60 + Math.random() * 40; // 60-100%
                        endY = Math.random() * 40; // 0-40%
                        break;
                    case 1: // 右下到左上
                        startX = 60 + Math.random() * 40; // 60-100%
                        startY = 60 + Math.random() * 40; // 60-100%
                        endX = Math.random() * 40; // 0-40%
                        endY = Math.random() * 40; // 0-40%
                        break;
                    case 2: // 左上到右下
                        startX = Math.random() * 40; // 0-40%
                        startY = Math.random() * 40; // 0-40%
                        endX = 60 + Math.random() * 40; // 60-100%
                        endY = 60 + Math.random() * 40; // 60-100%
                        break;
                    case 3: // 右上到左下
                        startX = 60 + Math.random() * 40; // 60-100%
                        startY = Math.random() * 40; // 0-40%
                        endX = Math.random() * 40; // 0-40%
                        endY = 60 + Math.random() * 40; // 60-100%
                        break;
                }

                // 随机旋转角度
                const rotate = (Math.random() - 0.5) * 60; // -30到30度

                // 随机动画时长
                const duration = 2.5 + Math.random() * 2; // 2.5-4.5秒

                // 设置CSS变量
                poemElement.style.setProperty("--moveX", `${endX - startX}vw`);
                poemElement.style.setProperty("--moveY", `${endY - startY}vh`);
                poemElement.style.setProperty("--rotate", `${rotate}deg`);

                // 设置起始位置
                poemElement.style.left = `${startX}vw`;
                poemElement.style.top = `${startY}vh`;

                // 设置动画
                poemElement.style.animation = `float-poem ${duration}s ease-in-out infinite`;
                poemElement.style.animationDelay = `${Math.random() * 1}s`; // 随机延迟0-1秒

                poemContainer.appendChild(poemElement);
                activePoems++;
                // 动画结束后移除诗句并创建新的
                poemElement.addEventListener("animationend", () => {
                    poemElement.remove();
                    activePoems--;
                    createPoem();
                });
            }
        }, Math.random() * 500); // 随机延迟0-500ms
    }

    // 初始创建多个诗句
    for (let i = 0; i < maxPoems; i++) {
        createPoem();
    }
});

// 保留原有的数据
const cityOptions = {
    name: "绍兴",
    attractions: [
        "鲁迅故里",
        "沈园",
        "柯岩风景区",
        "东湖风景区",
        "兰亭风景区",
        "安昌古镇",
        "上虞区",
        "诸暨市",
        "嵊州市",
        "新昌县",
    ],
    image: "",
    video: "",
    audio: "",
    address: "浙江省绍兴市",
};

// 首页组件
const Home = {
    template: `
          <div class="page-container">
            <div class="welcome-section">
              <h1 class="welcome-title">绍兴之旅</h1>
              <p class="welcome-desc">携宝贝共同探索绍兴的风景与美食</p>
              <div class="city-image-container">
                <img 
                  src="https://imgform.oss-cn-hangzhou.aliyuncs.com/%E7%BB%8D%E5%85%B4/shaoxingtu.jpg" 
                  alt="绍兴风景" 
                  class="city-image"
                />
              </div>
            </div>
            
            <div class="trip-info">
              <div class="trip-info-title">行程概览</div>
              <div class="trip-info-item">
                <div class="trip-info-icon">
                  <van-icon name="train-o" size="20" color="#8b4513" />
                </div>
                <div class="trip-info-text">
                  出发：<span class="trip-info-time">10月2日 09:11</span> 武汉站
                </div>
              </div>
              <div class="trip-info-item">
                <div class="trip-info-icon">
                  <van-icon name="location-o" size="20" color="#8b4513" />
                </div>
                <div class="trip-info-text">
                  抵达：<span class="trip-info-time">10月2日 13:53</span> 绍兴北站
                </div>
              </div>
              <div class="trip-info-item">
                <div class="trip-info-icon">
                  <van-icon name="train-o" size="20" color="#8b4513" />
                </div>
                <div class="trip-info-text">
                  出发：<span class="trip-info-time">10月4日 14:00</span> 绍兴酒店
                </div>
              </div>
              <div class="trip-info-item">
                <div class="trip-info-icon">
                  <van-icon name="location-o" size="20" color="#8b4513" />
                </div>
                <div class="trip-info-text">
                  抵达：<span class="trip-info-time">10月4日 15:00</span> 杭州姑娘桥
                </div>
              </div>
              <div class="trip-info-item">
                <div class="trip-info-icon">
                  <van-icon name="train-o" size="20" color="#8b4513" />
                </div>
                <div class="trip-info-text">
                  返程：<span class="trip-info-time">10月6日 13:27</span> 绍兴北站
                </div>
              </div>
              <div class="trip-info-item">
                <div class="trip-info-icon">
                  <van-icon name="location-o" size="20" color="#8b4513" />
                </div>
                <div class="trip-info-text">
                  到达：<span class="trip-info-time">10月6日 18:43</span> 武汉站
                </div>
              </div>
            </div>

            <div class="start-button">
              <van-button 
                class="day-button"
                @click="goToDateSelect"
              >
                开始旅程
              </van-button>
            </div>
          </div>
        `,
    methods: {
        goToDateSelect() {
            this.$router.push("/date-select");
        },
    },
};

// 日期选择页面
const DateSelect = {
    template: `
          <div class="page-container">
            <van-nav-bar
              title="选择日期"
              left-arrow
              @click-left="onClickLeft"
            />
            <div class="day-buttons">
              <van-button 
                v-for="(day, index) in days" 
                :key="day"
                class="day-button"
                @click="goToDay(day)"
              >
                {{ dayLabel(day) }}
              </van-button>
              <div style="display:flex;gap:8px;margin:16px 0;align-items:center;">
                <van-field v-model="newDay" placeholder="新增日期 如10.6" style="flex:1;" input-align="center" />
                <van-button class="theme-btn" size="small" style="min-width:80px;" @click="addDay">新增日期</van-button>
              </div>
              <van-button class="day-button" @click="goToPlanConfig">
                配置旅行计划
              </van-button>
            </div>
          </div>
        `,
    data() {
        return {
            newDay: ''
        };
    },
    computed: {
        days() {
            // 动态获取travelPlanData的所有key并排序
            const data = this.$root.travelPlanData || {};
            return Object.keys(data).sort();
        }
    },
    methods: {
        onClickLeft() {
            this.$router.push("/");
        },
        goToDay(day) {
            this.$router.push(`/day/${day}`);
        },
        goToPlanConfig() {
            this.$router.push("/plan-config");
        },
        dayLabel(day) {
            // 10.2 => 10月2日
            if (/^\d{2}\.\d{1,2}$/.test(day)) {
                const [m, d] = day.split('.');
                return `${m}月${d}日`;
            }
            return day;
        },
        addDay() {
            const val = this.newDay.trim();
            if (!/^\d{2}\.\d{1,2}$/.test(val)) {
                this.$toast('请输入格式如10.6的日期');
                return;
            }
            if (this.$root.travelPlanData[val]) {
                this.$toast('该日期已存在');
                return;
            }
            // 新增日期，初始含一条空行程
            this.$set(this.$root.travelPlanData, val, [{
                time: '', title: '', desc: '', icon: '', status: 'active'
            }]);
            this.newDay = '';
            // 跳转到配置页面
            this.$router.push('/plan-config');
        }
    },
};

// 配置旅行计划页面
const PlanConfig = {
    template: `
          <div class="page-container">
            <van-nav-bar title="配置旅行计划" left-arrow @click-left="onClickLeft" />
            <div v-if="loading" style="text-align:center;padding:40px 0;">加载中...</div>
            <div v-else>
              <div v-for="(items, day) in localPlanData" :key="day" class="plan-day-card" style="position:relative;">
                <div class="plan-day-title" style="display:flex;align-items:center;justify-content:space-between;">
                  <span>{{ day }} 日行程</span>
                  <van-button icon="delete-o" size="small" class="danger-btn" style="margin-left:8px;" @click.stop="confirmRemoveDay(day)" />
                </div>
                <div v-for="(item, idx) in items" :key="idx" class="plan-item-card">
                  <van-field v-model="item.title" label="标题" placeholder="请输入标题" />
                  <van-field v-model="item.time" label="时间" placeholder="如09:00" />
                  <van-field v-model="item.desc" label="描述" placeholder="请输入描述" />
                  <div style="display:flex;align-items:center;margin-top:4px;">
                    <van-field v-model="item.icon" label="图标" placeholder="如train-o" style="flex:1;" />
                  </div>
                  <div style="display:flex;justify-content:flex-end;margin-top:8px;">
                    <van-button size="small" class="danger-btn" @click="confirmRemoveItem(day, idx)">删除</van-button>
                  </div>
                </div>
                <van-button size="small" class="theme-btn" @click="addItem(day)" style="margin-top:8px;">添加行程</van-button>
              </div>
              <van-button  style="background-color: #9b4f27;color: #fff;margin-top:24px;" @click="confirmSave" class="day-button">保存计划</van-button>
            </div>
          </div>
        `,
    data() {
        return {
            loading: true,
            localPlanData: {},
            removeTarget: null, // {day, idx}
        };
    },
    created() {
        // 拷贝一份数据用于编辑
        this.localPlanData = JSON.parse(
            JSON.stringify(this.$root.travelPlanData)
        );
        this.loading = false;
    },
    methods: {
        onClickLeft() {
            this.$router.push("/date-select");
        },
        addItem(day) {
            this.localPlanData[day].push({
                time: "",
                title: "",
                desc: "",
                icon: "",
                status: "active",
            });
        },
        confirmRemoveItem(day, idx) {
            if (this.localPlanData[day].length <= 1) {
                this.$toast("每一天至少保留一条行程");
                return;
            }
            this.removeTarget = { day, idx };
            this.$dialog
                .confirm({
                    title: "确认删除",
                    message: "确定要删除这条行程吗？",
                    confirmButtonText: "删除",
                    cancelButtonText: "取消",
                    className: "theme-dialog",
                })
                .then(() => {
                    this.removeItem(day, idx);
                });
        },
        removeItem(day, idx) {
            this.localPlanData[day].splice(idx, 1);
        },
        confirmRemoveDay(day) {
            this.$dialog.confirm({
                title: '确认删除',
                message: `确定要删除 ${day} 这一天的所有行程吗？`,
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                className: 'theme-dialog',
            }).then(() => {
                this.removeDay(day);
            });
        },
        removeDay(day) {
            this.$delete(this.localPlanData, day);
            this.$delete(this.$root.travelPlanData, day);
        },
        confirmSave() {
            if (Object.keys(this.localPlanData).length === 0) {
                this.$toast('请先添加行程数据');
                return;
            }
            this.$dialog.confirm({
                title: '确认保存',
                message: '确定要保存当前计划吗？',
            }).then(() => {
                this.savePlan();
            }).catch(() => {});
        },
        savePlan() {
            // 保存到OSS（PUT到JSON文件地址）
            fetch(
                "https://imgform.oss-cn-hangzhou.aliyuncs.com/travelPlanData.json",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(this.localPlanData),
                }
            )
                .then((res) => {
                    if (res.ok) {
                        this.$root.travelPlanData = JSON.parse(
                            JSON.stringify(this.localPlanData)
                        );
                        // 修复：保存成功后刷新本地数据
                        this.localPlanData = JSON.parse(
                            JSON.stringify(this.$root.travelPlanData)
                        );
                        this.$toast.success("保存成功！");
                    } else {
                        this.$toast.fail("保存失败");
                    }
                })
                .catch(() => {
                    this.$toast.fail("保存失败");
                });
        },
    },
};

// 每日行程组件
const DayPlan = {
    template: `
          <div class="page-container">
            <van-nav-bar
              :title="day + '日行程'"
              left-arrow
              @click-left="onClickLeft"
            />
            <div class="day-content">
              <div class="day-content-item">
                <van-steps direction="vertical" :active="999" active-color="#9b4f27" inactive-color="#9b4f27">
                    <van-step v-for="(item, index) in dayPlan" :key="index" style="color: #9b4f27;">
                        <h3>{{ item.title }}  
                            <span style="font-size: 14px;margin-left: 10px;">--</span>
                            <span style="font-size: 14px;margin-left: 10px;">{{ item.time }}</span>
                        </h3>
                        <div>{{ item.desc }}</div>
                    </van-step>
                </van-steps>
              </div>
            </div>
          </div>
        `,
    data() {
        return {
            day: this.$route.params.day,
        };
    },
    computed: {
        dayPlan() {
            return this.$root.travelPlanData[this.day] || [];
        },
    },
    methods: {
        onClickLeft() {
            this.$router.push("/date-select");
        },
    },
};

// 景点详情组件
const AttractionDetail = {
    template: `
          <div class="page-container">
            <van-nav-bar
              :title="attraction"
              left-arrow
              @click-left="onClickLeft"
            />
            <div class="attraction-content">
                <div class="attraction-content-item">
                    <div class="attraction-content-item-title">
                        <span>景点名称</span>
                        <span>景点地址</span>
                    </div>
                </div>
            </div>
          </div>
        `,
    data() {
        return {
            attraction: this.$route.params.attraction,
        };
    },
    methods: {
        onClickLeft() {
            this.$router.push(`/day/${this.day}`);
        },
    },
};

// 路由配置
const routes = [
    { path: "/", component: Home },
    { path: "/date-select", component: DateSelect },
    { path: "/day/:day", component: DayPlan },
    { path: "/day/:day/:attraction", component: AttractionDetail },
    { path: "/plan-config", component: PlanConfig },
];

const router = new VueRouter({
    routes,
});

// 创建Vue实例
new Vue({
    el: "#app",
    router,
    data: {
        travelPlanData: {}, // 用于存储OSS获取的数据
    },
    created() {
        // 使用Vant
        Vue.use(vant);
        // 页面首次加载时从OSS获取数据
        fetch(
            "https://imgform.oss-cn-hangzhou.aliyuncs.com/travelPlanData.json"
        ) // TODO: 替换为你的OSS真实地址
            .then((res) => res.json())
            .then((data) => {
                this.travelPlanData = data;
            })
            .catch(() => {
                this.travelPlanData = {}; // 获取失败时兜底
            });
    },
    mounted() {
        // 页面加载完成后，隐藏加载动画
        setTimeout(() => {
            const loadingOverlay = document.getElementById("loadingOverlay");
            if (loadingOverlay) {
                loadingOverlay.style.opacity = "0";
                setTimeout(() => {
                    loadingOverlay.style.display = "none";
                }, 500);
            }
        }, 3000); // 至少显示3秒加载动画
    },
});