<template>
  <div class="home">
    <div class="header">
      <div
        class="header-bg"
        :style="{ backgroundImage: 'url(' + headerImg + ')' }"
      >
        <div class="header-bg-mask"></div>
      </div>
      <div class="notice-box">
        <van-notice-bar
          class="notice"
          left-icon="volume-o"
          :text="notice"
          background="rgba(255,255,255)"
          color="#f04142"
          scrollable
        >
        </van-notice-bar>
      </div>
    </div>
    <div class="content">
      <div class="travel-select">
        <h4 class="title">查询出行防疫政策</h4>
        <p class="tips">鼓励春节期间减少流动和聚集，降低感染风险</p>
        <div class="select">
          <div class="select-item" @click="selectCity(0)">
            <div class="item-text">
              {{ form ? from_info.city_name : "出发地" }}
            </div>
            <span class="icon-arrow"></span>
          </div>
          <div class="select-transfer"></div>
          <div class="select-item" @click="selectCity(1)">
            <div class="item-text">
              {{ to ? to_info.city_name : "目的地" }}
            </div>
            <span class="icon-arrow"></span>
          </div>
        </div>
      </div>
      <div class="policies" v-if="form">
        <div class="policies-content">
          <div class="city-policies" v-if="isOne">
            <div class="city-policies-location">
              {{ from_info.city_name }}
              <img
                class="risk-level-tag"
                :src="from_info.risk_level | risk_level"
              />
            </div>
            <div class="city-policies-content">
              <div class="city-policies-content-placeholder with-border"></div>
              <div class="city-policies-content-list">
                <div class="city-policies-content-list-item">
                  <div class="city-policies-content-list-item-title">
                    外出政策
                  </div>
                  <div class="policies-ellipsis">
                    <v-clamp class="clamp" autoresize :max-lines="5">
                      <template>{{ from_info.out_desc }}</template>
                      <template v-slot:after="{ clamped, toggle }">
                        <span v-if="clamped" @click="toggle" class="more"
                          >展开</span
                        >
                      </template>
                    </v-clamp>
                  </div>
                </div>
                <div class="city-policies-content-list-item">
                  <div class="city-policies-content-list-item-title">
                    进入政策
                  </div>
                  <div class="policies-ellipsis">
                    <v-clamp class="clamp" autoresize :max-lines="5">
                      <template>{{ from_info.high_in_desc }}</template>
                      <template v-slot:after="{ clamped, toggle }">
                        <span v-if="clamped" @click="toggle" class="more"
                          >展开</span
                        >
                      </template>
                    </v-clamp>
                    <!-- <text-flow
                      :width="5.72"
                      :maxLines="5"
                      :text="changeBr(from_info.high_in_desc)"
                    >
                      <template v-slot:default="{ clickToggle, expanded }">
                        <span
                          @click="clickToggle"
                          style="color: red; margin-left: 10px"
                        >
                          {{ expanded ? "收起" : "展开" }}
                        </span>
                      </template>
                    </text-flow> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="to">
            <div class="trip-policies">
              <div class="city-policies-location">
                {{ "出" + from_info.city_name }}
                <img
                  class="risk-level-tag"
                  :src="from_info.risk_level | risk_level"
                />
              </div>
              <div class="city-policies-content">
                <div
                  class="city-policies-content-placeholder with-border"
                ></div>
                <div class="trip-policies-content-list">
                  <div class="city-policies-content-list-item">
                    <div class="policies-ellipsis">
                      <v-clamp class="clamp" autoresize :max-lines="5">
                        <template>{{ from_info.out_desc }}</template>
                        <template v-slot:after="{ clamped, toggle }">
                          <span v-if="clamped" @click="toggle" class="more"
                            >展开</span
                          >
                        </template>
                      </v-clamp>
                    </div>
                  </div>
                </div>
              </div>
              <div class="city-policies-location-in">
                {{ "进" + to_info.city_name }}
                <img
                  class="risk-level-tag"
                  :src="to_info.risk_level | risk_level"
                />
              </div>
              <div class="city-policies-content">
                <div class="city-policies-content-placeholder"></div>
                <div class="trip-policies-content-list">
                  <div class="city-policies-content-list-item">
                    <div class="policies-ellipsis">
                      <v-clamp class="clamp" autoresize :max-lines="5">
                        <template>{{
                          from_info.risk_level === 1
                            ? to_info.low_in_desc
                            : to_info.high_in_desc
                        }}</template>
                        <template v-slot:after="{ clamped, toggle }">
                          <span v-if="clamped" @click="toggle" class="more"
                            >展开</span
                          >
                        </template>
                      </v-clamp>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="trip-policies">
              <div class="city-policies-location">
                {{ "出" + to_info.city_name }}
                <img
                  class="risk-level-tag"
                  :src="to_info.risk_level | risk_level"
                />
              </div>
              <div class="city-policies-content">
                <div
                  class="city-policies-content-placeholder with-border"
                ></div>
                <div class="trip-policies-content-list">
                  <div class="city-policies-content-list-item">
                    <div class="policies-ellipsis">
                      <v-clamp class="clamp" autoresize :max-lines="5">
                        <template>{{ to_info.out_desc }}</template>
                        <template v-slot:after="{ clamped, toggle }">
                          <span v-if="clamped" @click="toggle" class="more"
                            >展开</span
                          >
                        </template>
                      </v-clamp>
                    </div>
                  </div>
                </div>
              </div>
              <div class="city-policies-location-in">
                {{ "进" + from_info.city_name }}
                <img
                  class="risk-level-tag"
                  :src="from_info.risk_level | risk_level"
                />
              </div>
              <div class="city-policies-content">
                <div class="city-policies-content-placeholder"></div>
                <div class="trip-policies-content-list">
                  <div class="city-policies-content-list-item">
                    <div class="policies-ellipsis">
                      <v-clamp class="clamp" autoresize :max-lines="5">
                        <template>{{
                          to_info.risk_level === 1
                            ? from_info.low_in_desc
                            : from_info.high_in_desc
                        }}</template>
                        <template v-slot:after="{ clamped, toggle }">
                          <span v-if="clamped" @click="toggle" class="more"
                            >展开</span
                          >
                        </template>
                      </v-clamp>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="policies-reminder">
            {{ tips }}
          </div>
        </div>
      </div>
      <div v-if="to_health.picture || from_health.picture" class="qr-code">
        <h4 class="title">请准备好进出凭证</h4>
        <div
          v-if="form && from_health.picture"
          class="img-card"
          @click="show(0)"
        >
          <div>
            <van-icon class="qr" name="qr" />
            <span>{{ from_info.city_name }}</span>
          </div>
          <div>
            <span class="code">{{ from_health.name }}</span>
            <van-icon class="arrow" name="arrow" />
          </div>
        </div>
        <div v-if="to && to_health.picture" class="img-card" @click="show(1)">
          <div>
            <van-icon class="qr" name="qr" />
            <span>{{ to_info.city_name }}</span>
          </div>
          <div>
            <span class="code">{{ to_health.name }}</span>
            <van-icon class="arrow" name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>
        <a target="_blank" href="http://xg.okxiaogua.cn/">淘小呱</a>
        <span>|</span>
        <a target="_blank" href="https://qnets.cn/"
          >轻念 ©2012-{{ new Date().getFullYear() }}</a
        >
      </div>
      <a target="_blank" href="https://beian.miit.gov.cn/">豫ICP备18036201号</a>
    </div>
    <van-popup
      @closed="cancel(0)"
      v-model="leftCity"
      round
      position="bottom"
      get-container="body"
    >
      <van-area
        ref="leftCity"
        :value="from_code"
        :visible-item-count="5"
        item-height="1rem"
        title="选择城市"
        :area-list="areaList"
        :columns-num="2"
        @cancel="cancel(0)"
        @confirm="confirm"
      >
      </van-area>
    </van-popup>
    <van-popup
      @closed="cancel(1)"
      v-model="rightCity"
      round
      position="bottom"
      get-container="body"
    >
      <van-area
        ref="rightCity"
        :value="to_code"
        :visible-item-count="5"
        item-height="1rem"
        title="选择城市"
        :area-list="areaList"
        :columns-num="2"
        @cancel="cancel(1)"
        @confirm="confirm1"
      />
    </van-popup>
    <van-dialog
      width="6.4rem"
      confirm-button-text="我知道了"
      confirm-button-color="#596B95"
      v-model="showImg"
      :title="showCode.desc"
    >
      <div class="tips">长按图片可保存</div>
      <img class="img" :src="showCode.picture" fit="cover" />
    </van-dialog>
  </div>
</template>

<script>
import cityList from './cityList.json';
import { getSelf } from '../axios/index';
import VClamp from 'vue-clamp';
export default {
  data() {
    return {
      isOne: true,
      leftCity: false,
      rightCity: false,
      headerImg: 'https://ftp.qnets.cn/cov/header.jpg',
      tips: '以上政策整理自当地政府等公开发布的消息，如有更新或错漏，请以最新政策为准，建议在出行前咨询当地防疫部门、机场、火车站等',
      notice: '国家卫健委：返乡人员需持7天内核酸检测阴性结果返乡，返乡后实行14天居家健康监测，每7天开展一次核酸检测。',
      from_code: '', // 出发地城市id
      from_info: [],
      from_health: {
        picture: ""
      },
      to_code: '', // 目的地城市id
      to_info: [],
      to_health: {
        picture: ""
      },
      areaList: [], //城市数据
      showImg: false, // 是否展示健康码
      showCode: {},
    }
  },
  created() {
    this.getSelf();
  },
  mounted() {
    this.areaList = cityList;
  },
  methods: {
    getSelf() {
      this.Toast.setDefaultOptions({ duration: 0 });
      this.Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      getSelf().then(res => {
        this.from_info = res.from_city_covid_info;
        this.from_health = res.from_city_covid_info.health_code;
        this.from_code = res.from_city_covid_info.city_code;
        this.Toast.clear();
      }).catch(err => {
        return err;
      });
    },
    getOne(form) {
      if (form !== this.from_code) {
        this.Toast.setDefaultOptions({ duration: 0 });
        this.Toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        getSelf({ from_city_code: form }).then(res => {
          this.from_info = res.from_city_covid_info;
          this.from_health = res.from_city_covid_info.health_code;
          this.from_code = res.from_city_covid_info.city_code;
          this.Toast.clear();
        }).catch(err => {
          return err;
        });
      }
    },
    getTow(form, to) {
      this.Toast.setDefaultOptions({ duration: 0 });
      this.Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      getSelf({ from_city_code: form, to_city_code: to }).then(res => {
        this.from_info = res.from_city_covid_info;
        this.from_health = res.from_city_covid_info.health_code;
        this.from_code = res.from_city_covid_info.city_code;
        this.to_info = res.to_city_covid_info;
        this.to_health = res.to_city_covid_info.health_code;
        this.to_code = res.to_city_covid_info.city_code;
        this.Toast.clear();
      }).catch(err => {
        return err;
      });
    },
    selectCity(index) {
      if (index === 0) {
        this.leftCity = true;
      } else {
        this.rightCity = true;
      }
    },
    cancel(index) {
      if (index === 0) {
        this.leftCity = false;
        setTimeout(() => {
          this.$refs.leftCity.reset(this.from_code);
        }, 500);
      } else {
        this.rightCity = false;
        setTimeout(() => {
          this.$refs.rightCity.reset(this.to_code);
        }, 500);
      }
    },
    confirm(arr) {
      if (this.to_code) {
        this.getTow(arr[1].code, this.to_code);
      } else {
        this.getOne(arr[1].code);
      }
      this.from_code = arr[1].code;
      this.cancel(0);
    },
    confirm1(arr) {
      this.isOne = false;
      this.getTow(this.from_code, arr[1].code)
      this.to_code = arr[1].code;
      this.cancel(1);
    },
    show(index) {
      if (index === 0) {
        this.showCode = this.from_health;
      } else {
        this.showCode = this.to_health;
      }
      this.showImg = true;
    }
  },
  computed: {
    form() {
      if (this.from_info.length !== 0) {
        return true;
      } else {
        return false;
      }
    },
    to() {
      if (this.to_info.length !== 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  filters: {
    risk_level(val) {
      let base = 'https://ftp.qnets.cn/cov/';
      if (val === 1) {
        return base + "risk-level-low.png";
      } else if (val === 2) {
        return base + "risk-level-middle.png";
      } else if (val === 3) {
        return base + "risk-level-high.png";
      } else if (val === 4) {
        return base + "risk-level-part-middle.png";
      } else if (val === 5) {
        return base + "risk-level-part-high.png";
      } else {
        return base + "risk-level-part-middle-high.png";
      }
    }
  },
  components: {
    VClamp
  }
}
</script>

<style lang="less" scoped>
.home {
  .header {
    position: relative;
  }
  .header-bg {
    position: relative;
    width: 100%;
    height: 4.32rem;
    background-size: cover;
    background-repeat: no-repeat;
    .header-bg-mask {
      bottom: -0.2rem;
      z-index: 0;
      position: absolute;
      width: 100%;
      height: 2.2rem;
      background: linear-gradient(
        180deg,
        hsla(0, 0%, 100%, 0.0001),
        #f8f8f8 51.32%
      );
      background-size: 100% 3.64rem;
      background-repeat: no-repeat;
    }
  }
  .notice-box {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    padding: 0 0.32rem;
    .notice {
      border-radius: 0.2rem;
      height: 0.8rem;
    }
    /deep/.van-notice-bar__content {
      font-size: 0.26rem;
      transition: transform linear;
    }
    /deep/ .van-icon {
      font-size: 0.28rem;
    }
  }
  .travel-select {
    margin: 0.32rem;
    border-radius: 0.2rem;
    background: #fff;
    padding: 0.32rem;
    .title {
      font-weight: normal;
      font-size: 0.36rem;
    }
    .tips {
      -webkit-text-size-adjust: none;
      font-size: 0.2rem;
      width: 100%;
      color: #999;
      margin: 0.06rem 0 0.2rem 0;
    }
    .select {
      font-size: 18px;
      display: flex;
      align-items: center;
      height: 1.2rem;
      background: #f8f8f8;
      border-radius: 0.2rem;
    }
    .select-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      flex: 1 1;
      .item-text {
        max-width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
      .icon-arrow {
        display: inline-block;
        margin-left: 0.12rem;
        height: 0.08rem;
        width: 0.14rem;
        background-image: url(https://sf1-dycdn-tos.pstatp.com/obj/eden-cn/uhbxpsht/images/rectangle.png);
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
    .select-transfer {
      width: 1.2rem;
      height: 1.2rem;
      background-image: url(https://sf1-dycdn-tos.pstatp.com/obj/eden-cn/yldvwfogeh7uhfphobog/amosImage/EpidemicPrevention/icon_change.png);
      background-repeat: no-repeat;
      background-size: 0.52rem 0.52rem;
      background-position: 50%;
    }
  }
  .policies {
    margin: 0.32rem;
    border-radius: 0.2rem;
    background: #fff;
    padding: 0.32rem;
    .city-policies {
      padding-bottom: 0.32rem;
    }
    .risk-level-tag {
      margin-left: 0.16rem;
      height: 0.32rem;
    }
    .city-policies-location {
      display: flex;
      align-items: center;
      padding-left: 0.5rem;
      position: relative;
      font-size: 0.34rem;
      line-height: 0.48rem;
      color: #000;
      font-weight: 500;
      &::before {
        content: "";
        position: absolute;
        top: 0.08rem;
        left: 0;
        display: block;
        width: 0.28rem;
        height: 0.32rem;
        background: url("https://ftp.qnets.cn/cov/location.png");
        background-position: 50%;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
    .city-policies-location-in {
      display: flex;
      align-items: center;
      padding-left: 0.5rem;
      position: relative;
      font-size: 0.34rem;
      line-height: 0.48rem;
      color: #000;
      font-weight: 500;
      &::before {
        content: "";
        position: absolute;
        top: 0.12rem;
        left: 0.01rem;
        display: block;
        width: 0.1rem;
        height: 0.1rem;
        background-color: #fff;
        border-radius: 0.6rem;
        border: 0.08rem solid #f04142;
      }
    }
    .city-policies-content {
      display: flex;
    }
    .city-policies-content-placeholder.with-border {
      background-image: url(https://ftp.qnets.cn/cov/border-dot.png);
      background-size: 0.2rem 0.2rem;
      background-position-x: center;
      background-repeat: repeat-y;
    }
    .city-policies-content-placeholder {
      flex-shrink: 0;
      width: 0.28rem;
      margin-right: 0.24rem;
    }
    .city-policies-content-list {
      padding-top: 0.2rem;
    }
    .city-policies-content-list-item {
      font-size: 0.3rem;
      &:not(:last-child) {
        margin-bottom: 0.4rem;
      }
    }
    .city-policies-content-list-item-title {
      margin-bottom: 0.08rem;
    }
    .policies-ellipsis {
      color: #505050;
      font-size: 0.26rem;
      line-height: 0.52rem;
    }
    .clamp {
      white-space: pre-wrap;
    }
    .more {
      color: rgb(240, 65, 66);
      margin-left: 10px;
    }
    .trip-policies {
      &:first-child {
        padding-bottom: 0.08rem;
        margin-bottom: 0.48rem;
        position: relative;
        border-radius: 0;
        border-bottom: 0.02rem solid #f2f2f2;
      }
    }
    .trip-policies-content-list {
      padding: 0.2rem 0 0.4rem;
    }
    .policies-reminder {
      padding-top: 0.18rem;
      border-top: 0.02rem solid #f2f2f2;
      color: #999;
      font-size: 0.2rem;
    }
  }
  .qr-code {
    margin: 0.32rem;
    border-radius: 0.2rem;
    background: #fff;
    padding: 0.32rem;
    .title {
      font-weight: normal;
      font-size: 0.36rem;
      margin-bottom: 0.32rem;
    }
  }
  .img-card {
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.34rem;
    margin-bottom: 0.34rem;
    border-radius: 0.1rem;
    background-color: #f8f8f8;
    &:last-child {
      margin: 0;
    }
    .qr {
      font-size: 0.54rem;
      margin: 0 0.2rem;
    }
    .arrow {
      font-size: 0.3rem;
      margin: 0 0.2rem 0 0.04rem;
    }
    div {
      display: flex;
      align-items: center;
      .code {
        color: #999;
        font-size: 0.28rem;
      }
    }
  }
  .footer {
    margin: 0 0.32rem;
    padding: 0 0 0.32rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.24rem;
    a {
      color: #999;
    }
    span {
      margin: 0 0.1rem;
      color: #999;
    }
  }
}
/deep/.van-picker-column {
  font-size: 0.32rem;
}
/deep/.van-picker__cancel,
/deep/.van-picker__confirm,
/deep/.van-picker__title {
  font-size: 0.3rem;
}
.van-dialog {
  font-size: 0.32rem;
  border-radius: 0.12rem;
}
/deep/.van-dialog__content {
  text-align: center;
  margin-bottom: 0.32rem;
  .img {
    width: 3.2rem;
    height: 3.2rem;
    pointer-events: auto;
  }
  .tips {
    font-size: 0.24rem;
    color: #f04142;
    margin: 0.2rem 0;
  }
}
</style>