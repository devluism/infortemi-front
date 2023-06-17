<template>
  <div class="bg-section">
    <div class="nav-background show fixed-top"></div>
    <div id="wrapper" class="mt">
      <nav class="navbar navbar-dark navbar-expand-lg py-4 fixed-top">
        <a href="#home"><img src="/media/landing/logo_footer.png" alt="FYT logo"
            class="navbar-brand w-100px w-md-120px" /></a>

        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarLinks"
          aria-controls="navbarLinks" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarLinks">
          <ul class="d-none d-lg-flex navbar-nav justify-content-center align-items-center w-100">
            <li class="nav-item">
              <a class="nav-link text-white text-uppercase text-nowrap fs-7" href="#programs">programs</a>
            </li>
            <span class="bullet h-25px w-2px bullet-vertical mx-3 bg-body"></span>
            <li class="nav-item">
              <a class="nav-link text-white text-uppercase text-nowrap fs-7" href="#packages">our packages</a>
            </li>
            <span class="bullet h-25px w-2px bullet-vertical mx-3 bg-body"></span>
            <li class="nav-item">
              <a class="nav-link text-white text-uppercase text-nowrap fs-7" href="#faq">faq</a>
            </li>
            <span class="bullet h-25px w-2px bullet-vertical mx-3 bg-body"></span>
            <li class="nav-item">
              <a data-bs-toggle="modal" data-bs-target="#contact-us-modal" style="cursor: pointer;" class="nav-link text-white text-uppercase text-nowrap fs-7">contact us</a>
            </li>
          </ul>
          <ul class="d-flex d-lg-none navbar-nav justify-content-center align-items-end w-100 bg-dark p-2 menu-mobile">
            <li class="nav-item active">
              <a class="nav-link text-white text-uppercase text-nowrap fs-7" href="#programs">programs</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white text-uppercase text-nowrap fs-7" href="#our-packages">our packages</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white text-uppercase text-nowrap fs-7" href="#faq">faq</a>
            </li>
            <li class="nav-item">
              <a data-bs-toggle="modal" data-bs-target="#contact-us-modal" style="cursor: pointer;" class="nav-link text-white text-uppercase text-nowrap fs-7">contact us</a>
            </li>
            <li class="nav-item d-inline d-lg-none">
              <router-link to="/sign-up" class="nav-link text-white text-uppercase text-nowrap fw-bold fs-7">Sign
                up</router-link>
            </li>
            <li class="nav-item d-inline d-lg-none">
              <router-link to="/sign-in"
                class="nav-link text-white text-uppercase text-nowrap fw-bold fs-7">Login</router-link>
            </li>
          </ul>
        </div>

        <div class="d-none d-lg-flex gap-4">
          <router-link to="/sign-up" class="btn btn-outline border-dark btn-active-dark text-white w-100px">Sign
            up</router-link>
          <router-link to="/sign-in" class="btn btn-dark w-100px">Login</router-link>
        </div>
      </nav>
      <section id="home" class="col-12 my-20 py-20">
        <div class="hidden d-flex flex-column flex-md-row h-100">
          <div
            class="order-2 order-md-1 col-12 col-md-5 d-flex flex-column justify-content-center align-items-center align-items-md-start pe-5 py-10">
            <h1 class="fs-3x text-center text-md-start text-uppercase text-white fw-semibold">
              already<br />funded?
            </h1>
            <p class="fs-4 text-center text-md-start text-light mb-7">
              You are only ONE PHASE away to join us!
            </p>
            <a :href="'/sign-up'" class="btn btn-outline border-dark btn-active-dark text-white text-uppercase fw-bold">
              apply for our fast challenge
            </a>
          </div>
          <div class="order-1 order-md-2 col-12 col-md-7 align-self-center video-styles">
            <video width="100%" loop autoplay muted style="pointer-events: none">
              <source src="/media/landing/promo-fyt.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
      <section id="programs">
        <div
          class="hidden d-flex flex-column flex-md-row gap-7 gap-md-20 justify-content-between align-items-center h-100 w-100">
          <div class="card card-plan py-10 h-350px w-100 mw-300px shadow">
            <div class="card-header border-0 w-100">
              <img class="w-75 mx-auto" src="/media/landing/fyt_evaluation_icon.png" alt="FYT Evaluation plan" />
            </div>
            <div class="card-body px-10">
              <h5 class="card-title text-center mb-10 fw-bold">
                FYT Evaluation
              </h5>
              <p class="card-text text-uppercase text-center fs-7 fw-light">
                phase I
              </p>
              <p class="card-text text-uppercase text-center fs-7 fw-light">
                phase II
              </p>
            </div>
          </div>

          <div class="card card-plan py-10 h-350px w-100 mw-300px shadow">
            <div class="card-header border-0 w-100">
              <img class="w-75 mx-auto" src="/media/landing/fyt_accelerated_icon.png" alt="FYT Accelerated plan" />
            </div>
            <div class="card-body px-10">
              <h5 class="card-title text-center mb-10 fw-bold">
                FYT Accelerated
              </h5>
              <p class="card-text text-uppercase text-center fs-7 fw-light">
                no daily drawdown limits
              </p>
              <p class="card-text text-uppercase text-center fs-7 fw-light">
                start immediately in real account
              </p>
            </div>
          </div>

          <div class="card card-plan py-10 h-350px w-100 mw-300px shadow">
            <div class="card-header border-0 w-100">
              <img class="w-75 mx-auto" src="/media/landing/fyt_fast_icon.png" alt="FYT Fast plan" />
            </div>
            <div class="card-body px-10">
              <h5 class="card-title text-center mb-10 fw-bold">FYT Fast</h5>
              <p class="card-text text-uppercase text-center fs-7 fw-light">
                already funded?
              </p>
              <p class="card-text text-uppercase text-center fs-7 fw-light">
                this one phase challenge is for you
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <section class="col-12 my-20 py-10 bg-section-trades">
    <div id="wrapper" class="hidden">
      <h1 class="fs-1 fw-black ls-1 text-uppercase text-center text-dark mb-20">
        How to fund your trades
      </h1>
      <div
        class="d-flex flex-column flex-lg-row gap-4 justify-content-around align-items-center align-items-lg-stretch w-100 h-100 px-0 py-20 pt-10">
        <div class="card bg-primary text-white shadow w-100 mw-400px">
          <div class="card-header border-0">
            <h5 class="card-title text-white text-start text-uppercase fw-bold fs-1">
              phase 1.
            </h5>
          </div>
          <div class="card-body pt-0">
            <h5 class="card-title text-white text-start mb-8">FYT Challenge</h5>
            <p class="card-text text-start fs-7 fw-light">
              We know you have the skills, that’s why this very first step is to
              prove yourself how good you are in trading.
            </p>
            <p class="card-text text-start fs-7 fw-light">
              This step is required in order to advance to the next one
            </p>
          </div>
        </div>

        <div class="card bg-secondary text-white shadow w-100 mw-400px">
          <div class="card-header border-0">
            <h5 class="card-title text-white text-start text-uppercase fw-bold fs-1">
              phase 2.
            </h5>
          </div>
          <div class="card-body pt-0">
            <h5 class="card-title text-white text-start mb-8">Confirmation</h5>
            <p class="card-text text-start fs-7 fw-light">
              This second step is to validate your trading system is not just
              luck. When you complete this second phase, we will start to Fund
              Your Trades.
            </p>
          </div>
        </div>

        <div class="card bg-primary text-white shadow w-100 mw-400px">
          <div class="card-header border-0">
            <h5 class="card-title text-white text-start text-uppercase fw-bold fs-1">
              phase 3.
            </h5>
          </div>
          <div class="card-body pt-0">
            <h5 class="card-title text-white text-start mb-8">FYT Trader</h5>
            <p class="card-text text-start fs-7 fw-light">
              As a trader for FYT, your primary goal should be to consistently
              execute trades with a responsible mindset & risk management. Your
              performance will be rewarded through earning potential of 90% of
              your profits.
            </p>
            <p class="card-text text-start fs-7 fw-light">
              Furthermore, if you consistently generate profits on your FYT
              account, the firm may consider increasing your account's size
              through their FAST AND ACCELERATED plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="our-packages" class="col-12 my-20 py-10 bg-setion-evaluation">
    <div id="wrapper">
      <div class="hidden container text-center w-100 h-100 px-0 pt-4 mb-20">
        <h1 class="fs-1 fw-bold ls-1 text-uppercase text-center text-dark mb-20">Our packages</h1>
        <el-tabs id="packages" v-model="activeTabName" class="demo-tabs" :stretch="true">
          <el-tab-pane v-for="program in programs" :key="program.id" :name="program.id">
            <template #label>
              <span class="text-hover-secondary">
                <span class="text-uppercase fw-bold">{{ program.title }}</span>
              </span>
            </template>

            <el-carousel type="card" height="550px" :autoplay="false" id="landingCarousel">
              <el-carousel-item v-for="item in program.packages" :key="item.id">
                <div class="card card-program text-white shadow position-relative my-20 w-100 mw-300px mx-auto">
                  <div class="card-header border-0 h-70px justify-content-center align-items-end">
                    <div class="hexagon-boder d-flex justify-content-center align-item-center">
                      <div class="hexagon hg-variant d-flex justify-content-center align-item-center">
                        <span class="text-white my-auto fw-bold fs-2">${{ item.account }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <span class="bullet bg-body w-30px h-2px d-block mx-auto mb-4"></span>
                    <div class="row g-5 text-white fs-7">
                      <div class="d-flex flex-row justify-content-between border-bottom py-2">
                        <span class="text-wrap text-start">Target:</span>
                        <span class="text-end">{{ item.target }}</span>
                      </div>
                      <div v-if="program.id === '1'" class="d-flex flex-row justify-content-between border-bottom py-2">
                        <span class="text-wrap text-start">Minimum Trading Days:</span>
                        <span class="text-end">{{ item.minimun_tading_days }}</span>
                      </div>
                      <div class="d-flex flex-row justify-content-between border-bottom py-2">
                        <span class="text-wrap text-start">Daily Starting Drawdown:</span>
                        <span class="text-end">{{ item.daily_starting_drawdown }}</span>
                      </div>
                      <div class="d-flex flex-row justify-content-between border-bottom py-2">
                        <span class="text-wrap text-start">Overall Drawdown:</span>
                        <span class="text-end">{{ item.overall_drawdown }}</span>
                      </div>
                      <div class="d-flex flex-row justify-content-between border-bottom py-2">
                        <span class="text-wrap text-start">Available Leverage:</span>
                        <span class="text-end">{{ item.available_Leverage }}</span>
                      </div>
                      <div v-if="program.id != '1'" class="d-flex flex-row justify-content-between border-bottom py-2">
                        <span class="text-wrap text-start">Scalability Plan:</span>
                        <span class="text-end">{{ item.assured_funding }}</span>
                      </div>
                      <div v-if="program.id != '1'" class="d-flex flex-row justify-content-between py-2">
                        <span class="text-wrap text-start">Registration Fee:</span>
                        <span class="text-end">{{ item.refundable_registration_fee }}</span>
                      </div>
                      <div v-else class="d-flex flex-row justify-content-between py-2">
                        <span class="text-wrap text-start">Refundable Registration Fee:</span>
                        <span class="text-end">{{ item.refundable_registration_fee }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </section>

  <section class="col-12 my-20 py-10 bg-section-benefits">
    <div id="wrapper" class="hidden">
      <div class="col-8 col-md-12 mx-auto">
        <h1 class="fs-1 fs-lg-2hx fw-bold ls-1 text-uppercase text-start text-dark mb-4 w-75">
          BENEFITS TO HAVING AN ACCOUNT FUNDED WITH FYT
        </h1>
      </div>
      <div class="row align-items-center p-0">
        <div class="col-8 col-md-6 row row-cols-1 row-cols-md-2 mx-auto p-0">
          <div class="col">
            <h4 class="fs-4 text-primary text-uppercase">Risk free capital</h4>
            <p class="fs-7">
              FYT provide the trader with capital to trade with, which can be
              used to increase the size and potential returns of their trades
              without risking their own money.
            </p>
          </div>
          <div class="col">
            <h4 class="fs-4 text-primary text-uppercase">
              Community of traders
            </h4>
            <p class="fs-7">
              FYT have a community among traders, which can be beneficial for
              networking, learning and motivation. Get access to our invite-only
              special events
            </p>
          </div>
          <div class="col">
            <h4 class="fs-4 text-primary text-uppercase">
              Potential to earn a profit share
            </h4>
            <p class="fs-7">
              FYT offers a profit-sharing arrangements, where traders can earn a
              percentage of the profits generated by their trades.
            </p>
          </div>
          <div class="col">
            <h4 class="fs-4 text-primary text-uppercase">Scalability</h4>
            <p class="fs-7">
              FYT have scaling plans that allow traders to increase the size of
              their accounts as they become more profitable. Like the
              <strong>FAST</strong> and <strong>ACCELERATED</strong> program
            </p>
          </div>
        </div>
        <div class="d-none d-md-block col-6">
          <img class="w-100 ps-10" src="/media/landing/devices.png" alt="Image of devices" />
        </div>
      </div>
    </div>
  </section>

  <section class="col-12 my-20 py-10 bg-section-benefits-payment">
    <div id="wrapper" class="hidden">
      <div class="row align-items-center">
        <div class="d-none d-md-block col-6">
          <img class="pe-4 w-100" src="/media/landing/trading.png" alt="Image of devices" />
        </div>
        <div class="col-8 col-md-6 mx-auto">
          <h1 class="fs-1 fs-lg-2x text-primary text-uppercase text-start mb-5">
            Payment system
          </h1>
          <p class="fs-5">
            The standard payout ratio for FYT traders is 80:20, but this isn't
            the limit. If you meet the requirements of our Scaling Plan, your
            FYT account balance will increase up to 25% and the payout ratio will
            improve to a generous 90:10 once your account reaches over 1 Million
            Dollar under management. Additionally, FYT traders have the
            flexibility to request payout every 15 days.
          </p>
          <p class="fs-5">
            Withdrawals can be processed every 15 days. We ensure that you will
            always receive your payout on time.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!--
  <section class="col-12 my-20 py-10 bg-section-benefits-testimonials">
    <div id="wrapper" class="hidden">
      <h1 class="fs-1 fs-lg-2x fw-bold ls-1 text-uppercase text-center text-dark my-20">
        Testimonials from our traders
      </h1>
      <div class="row row-cols-auto row-cols-md-4 justify-content-center">
        <div class="col-12 col-sm-6 col-md-3 text-center mb-8">
          <img class="w-25 w-sm-50 w-md-75 shadow" src="/media/landing/trader_1.png" alt="Trader image" />
          <div class="d-flex flex-column p-4 text-center mw-200px mx-auto">
            <h4 class="fs-4 fw-semibold text-capitalize text-dark">
              Louis Baker
            </h4>
            <div class="fs-7 text-truncate">
              Donec et dolor non erat ultrices pharetra sollicitudin ornare
              quam. Fusce et dapibus massa.
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 text-center mb-8">
          <img class="w-25 w-sm-50 w-md-75 shadow" src="/media/landing/trader_2.png" alt="Trader image" />
          <div class="d-flex flex-column p-4 text-center mw-200px mx-auto">
            <h4 class="fs-4 fw-semibold text-capitalize text-dark">
              Jonathan Rios
            </h4>
            <div class="fs-7 text-truncate">
              Donec et dolor non erat ultrices pharetra sollicitudin ornare
              quam. Fusce et dapibus massa.
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 text-center mb-8">
          <img class="w-25 w-sm-50 w-md-75 shadow" src="/media/landing/trader_3.png" alt="Trader image" />
          <div class="d-flex flex-column p-4 text-center mw-200px mx-auto">
            <h4 class="fs-4 fw-semibold text-capitalize text-dark">
              Jason Morales
            </h4>
            <div class="fs-7 text-truncate">
              Donec et dolor non erat ultrices pharetra sollicitudin ornare
              quam. Fusce et dapibus massa.
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 text-center mb-8">
          <img class="w-25 w-sm-50 w-md-75 shadow" src="/media/landing/trader_4.png" alt="Trader image" />
          <div class="d-flex flex-column p-4 text-center mw-200px mx-auto">
            <h4 class="fs-4 fw-semibold text-capitalize text-dark">
              Joseph Jordan
            </h4>
            <div class="fs-7 text-truncate">
              Donec et dolor non erat ultrices pharetra sollicitudin ornare
              quam. Fusce et dapibus massa.
            </div>
          </div>
        </div>
        <div class="col-12 text-center">
          <a href="#" class="btn btn-secondary text-white mt-10 text-nowrap fw-normal text-uppercase">See All
            testimonials</a>
        </div>
      </div>
    </div>
  </section> -->

  <section id="faq" class="col-12 py-10 bg-section-benefits-fqas">
    <div id="wrapper" class="hidden">
      <div class="d-flex flex-column align-items-center my-20">
        <h1 class="fs-1 fw-bold ls-1 text-uppercase text-center mb-10">FAQs</h1>
        <p class="fs-7 text-center w-100 w-md-50 mw-500px mb-10">
          Below you will find information about FYT and frequently asked questions. If you have any other questions,
          please contact us by e-mail.
        </p>
      </div>

      <div class="row">
        <el-tabs :tab-position="'left'" class="demo-tabs">
          <el-tab-pane label="● General">
            <el-collapse accordion class="ps-20">
              <el-collapse-item name="1">
                <template #title>
                  <span class="fw-bold  fs-5">What is Fund Your Trades as a prop trading firm?</span>
                </template>
                <div>
                  Fund Your Trades is a proprietary trading firm that provides traders with capital to trade in financial
                  markets. The firm offers access to trading platforms, market data, and other tools and resources to help
                  traders trade effectively.
                </div>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template #title>
                  <span class="fw-bold  fs-5">What are the benefits of trading with Fund Your Trades as a prop trading
                    firm?</span>
                </template>
                <div>
                  The benefits of trading with Fund Your Trades as a prop trading firm include
                  access to capital, which can allow you to trade larger positions than you
                  would be able to with your own funds. Additionally, Fund Your Trades covers
                  losses for traders, which means you won't be responsible for any trading
                  losses incurred while trading with the firm. The firm also allows withdrawals
                  every 15 days, providing traders with more frequent access to their profits.
                </div>
              </el-collapse-item>
              <el-collapse-item name="3">
                <template #title>
                  <span class="fw-bold  fs-5"> What fees does Fund Your Trades as a prop trading firm charge?</span>
                </template>
                <div>
                  Fund Your Trades as a prop trading firm charges various fees, such as the
                  initial challenge fee, Broker fees (MT5 Broker Spreads, Swaps and Lots
                  stablished by the providers), and a performance fee.. The performance fee is a
                  percentage of the profits earned by the trader (80% for the trader and 20% to
                  the prop firm to get started, 90% - 10% after trader qualifies with the scaling
                  plan and is funded with 7 figures+).
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>

          <el-tab-pane label="● Trading">
            <el-collapse accordion class="ps-20">
              <el-collapse-item name="4">
                <template #title>
                  <span class="fw-bold  fs-5">How do I become a trader with Fund Your Trades as a prop trading
                    firm?</span>
                </template>
                <div>
                  To become a trader with Fund Your Trades as a prop trading firm, you need
                  to apply and pass a trading evaluation or assessment. This evaluation may
                  involve simulated trading exercises or live trading with a small amount of
                  capital. If you pass the evaluation, you may be offered a position as a trader
                  with the firm.
                </div>
              </el-collapse-item>
              <el-collapse-item name="5">
                <template #title>
                  <span class="fw-bold  fs-5">What types of trading strategies does Fund Your Trades as a prop trading
                    firm allow?</span>
                </template>
                <div>
                  Fund Your Trades as a prop trading firm allows a wide range of trading
                  strategies, including scalping, day trading, swing trading, and position trading.
                  However, the firm has rules and restrictions regarding the types of trades that
                  traders are allowed to make. Expert Advisors (EA) are allowed as long as their
                  execution type is not defined by the HFT model (High Frequency Trading)
                  since the majority of these systems do not execute on actual liquidity.
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>

          <el-tab-pane label="● Challenges">
            <el-collapse accordion class="ps-20">
              <el-collapse-item name="6">
                <template #title>
                  <span class="fw-bold  fs-5">What is the difference between all FYT Challenges?</span>
                </template>
                <div>
                  <el-collapse accordion class="ps-10">
                    <el-collapse-item name="7">
                      <template #title>
                        <span class="badge bg-primary p-2 fw-semibold fs-6">Evaluation Challenge</span>
                      </template>
                      <div>
                        Is a TWO phase evaluation account, with daily and overall
                        drawdown limits and specific targets (see program for reference) with no scalability
                        plan and with refundable fee as long as no EA (Expert Advisor) is used to pass the
                        challenge. Profit Splits are 80% for the trader and 20% for the prop firm.
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="8">
                      <template #title>
                        <span class="badge bg-secondary p-2 fw-semibold fs-6">Accelerated Account</span>
                      </template>
                      <div>
                        Is a no challenge / immediate access account to a real server
                        for experienced traders, with no daily drawdown limits. Overall Drawdown applies..
                        Profit Splits are 50% for the trader and 50% for the prof firm traders can qualify for a
                        payout with a minimum of 15 trading days and this account has the best scalability
                        program that we can offer
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="9">
                      <template #title>
                        <span class="badge bg-primary p-2 fw-semibold fs-6">Fast Challenge</span>
                      </template>
                      <div>
                        Is a special non-refundable ONE phase evaluation exclusively for
                        traders that have passed the TWO phase evaluation either in our company or other
                        serious companies. Traders need to complete the Funded Trader KYC* in order to be
                        able to buy this type of accounts. Benefits are 80% profits split for the trader and 20%
                        for the prop firm. Also traders can apply for a Scaling of their funded capital every 90
                        days just like an accelerated program.
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </section>

  <section id="footer" class="col-12 bg-section-footer">
    <div id="wrapper" class="hidden">
      <div class="d-flex flex-column justify-content-end align-items-center h-100 w-100 pb-10">
        <div class="d-flex flex-column justify-content-end align-items-center mb-20">
          <h1 class="fs-1 fs-md-2qx fw-semibold text-center text-white mb-4">
            Subscribe to us
          </h1>
          <p class="fs-sm fs-md-6 text-center text-white mb-10">
            If you wish to recive news updates, Subscribe to us
          </p>
          <form @submit.prevent="subscribeEmail">
            <div class="input-group flex-nowrap mx-auto">
              <span class="input-group-text bg-white border-0">
                <img src="/media/landing/email_icon.png" alt="Email icon" />
              </span>
              <input @input="validateEmail" v-model="email_input" type="email"
                class="form-control border-0" placeholder="Enter your email" autocomplete="nope" />
              <button type="submit" :disabled="validate_email" class="btn btn-dark text-uppercase ls-1 fw-normal">
                Subscribe
              </button>
            </div>
          </form>
        </div>
        <div class="col-12">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div class="col-12 col-md-6 d-flex flex-column gap-1 mb-8 mb-md-0">
              <img src="/media/landing/logo_footer.png" alt="FYT logo" class="mb-4 mx-auto mx-md-0 w-150px w-md-200px" />
              <div class="d-flex gap-2 justify-content-center justify-content-md-start">
                <a href="https://www.facebook.com/profile.php?id=100089051470696&mibextid=LQQJ4d" target="_blank"
                  class="btn btn-icon btn-light btn-sm rounded-pill"><i class="text-dark fa-brands fa-facebook-f"></i></a>
                <a href="https://twitter.com/fundfyt?s=21&t=nbLO4mMyPfDoOcxPYcKsCw" target="_blank"
                  class="btn btn-icon btn-light btn-sm rounded-pill"><i class="text-dark fa-brands fa-twitter"></i></a>
                <a href="https://instagram.com/fundyourtrades?igshid=NDk5N2NlZjQ=" target="_blank"
                  class="btn btn-icon btn-light btn-sm rounded-pill"><i class="text-dark fa-brands fa-instagram"></i></a>
                <a href="https://Youtube.com/@fundyourtrades" target="_blank"
                  class="btn btn-icon btn-light btn-sm rounded-pill"><i class="text-dark fa-brands fa-youtube"></i></a>
                <a href="https://t.me/fundyourtrades" target="_blank"
                  class="btn btn-icon btn-light btn-sm rounded-pill"><i class="text-dark fa-brands fa-telegram"></i></a>
              </div>
            </div>
            <div class="col-12 col-md-6 d-flex justify-content-center justify-content-md-end gap-8">
              <!-- <a href="#" class="btn btn-dark btn-lg w-125px h-45px">
                <img src="/media/landing/app_store.png" alt="App store" class="w-80px text-center lh-0" />
              </a>
              <a href="#" class="btn btn-dark btn-lg w-125px h-45px">
                <img src="/media/landing/google_play.png" alt="Google play" class="w-80px text-center lh-0" />
              </a> -->
            </div>
          </div>
          <div class="row mt-8 g-2 g-md-0">
            <span class="col-12 col-md-6 text-white text-nowrap text-center text-md-start">Copy right 2023 FYT, All Rights
              Reserved.</span>
            <div class="col-12 col-md-6 d-flex gap-2 flex-column flex-md-row justify-content-end">
              <button data-bs-toggle="modal" data-bs-target="#terms-conditions-modal"
                class="btn bg-none p-0 fw-light text-white text-center text-md-end">Terms and Conditions</button>
              <button class="btn bg-none p-0 fw-light text-white text-center text-md-end">Privacy Policy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <KTScrollTop />

  <ContactUsModal></ContactUsModal>
  <TermsAndConditionsModal></TermsAndConditionsModal>
</template>

<script lang="ts">
import TermsAndConditionsModal from "@/components/modals/general/TermsAndConditionsModal.vue";
import ContactUsModal from "@/components/modals/general/ContactUsModal.vue";
import KTScrollTop from "@/layouts/main-layout/extras/ScrollTop.vue";
import { useBodyStore } from "@/stores/body";
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";
import { useAlertsStore } from "@/stores/alerts";
import { RouterLink } from "vue-router";
import axios from "axios";
import router from "@/router";

export default defineComponent({
  name: "landing-page",
  components: {
    KTScrollTop,
    TermsAndConditionsModal,
    ContactUsModal,
  },
  setup() {
    const programs = [
      {
        id: "1",
        title: "evaluation",
        packages: [
          {
            id: "1",
            target: "8% phase 1 / 5% phase 2",
            minimun_tading_days: "5 Days",
            daily_starting_drawdown: "5%",
            overall_drawdown: "10%",
            available_Leverage: "1:100",
            assured_funding: "",
            refundable_registration_fee: "$80",
            account: "10,000",
            color_bg: "bg-primary",
          },
          {
            id: "2",
            target: "8% phase 1 / 5% phase 2",
            minimun_tading_days: "5 Days",
            daily_starting_drawdown: "5%",
            overall_drawdown: "10%",
            available_Leverage: "1:100",
            assured_funding: "",
            refundable_registration_fee: "$130",
            account: "20,000",
            color_bg: "bg-secondary",
          },
          {
            id: "3",
            target: "8% phase 1 / 5% phase 2",
            minimun_tading_days: "5 Days",
            daily_starting_drawdown: "5%",
            overall_drawdown: "10%",
            available_Leverage: "1:100",
            assured_funding: "",
            refundable_registration_fee: "$290",
            account: "50,000",
            color_bg: "bg-primary",
          },
          {
            id: "4",
            target: "8% phase 1 / 5% phase 2",
            minimun_tading_days: "5 Days",
            daily_starting_drawdown: "5%",
            overall_drawdown: "10%",
            available_Leverage: "1:100",
            refundable_registration_fee: "$490",
            account: "100,000",
            color_bg: "bg-secondary",
          },
        ]
      },
      {
        id: "2",
        title: "accelerated",
        packages: [
          {
            id: "5",
            target: "10%",
            minimun_tading_days: "",
            daily_starting_drawdown: "No Daily Drawdown Limits",
            overall_drawdown: "5%",
            available_Leverage: "1:100",
            assured_funding: "$500,000",
            refundable_registration_fee: "$450",
            account: "10,000",
            color_bg: "bg-primary",
          },
          {
            id: "6",
            target: "10%",
            minimun_tading_days: "",
            daily_starting_drawdown: "No Daily Drawdown Limits",
            overall_drawdown: "5%",
            available_Leverage: "1:100",
            assured_funding: "$1,000,000",
            refundable_registration_fee: "$950",
            account: "20,000",
            color_bg: "bg-secondary",
          },
          {
            id: "7",
            target: "10%",
            minimun_tading_days: "",
            daily_starting_drawdown: "No Daily Drawdown Limits",
            overall_drawdown: "5%",
            available_Leverage: "1:100",
            assured_funding: "$1,500,000",
            refundable_registration_fee: "$2,300",
            account: "50,000",
            color_bg: "bg-primary",
          },
        ]
      },
      {
        id: "3",
        title: "fast",
        packages: [
          {
            id: "8",
            target: "7% Phase 1",
            minimun_tading_days: "",
            daily_starting_drawdown: "5%",
            overall_drawdown: "8%",
            available_Leverage: "1:100",
            assured_funding: "$250,000",
            refundable_registration_fee: "$600",
            account: "100,000",
            color_bg: "bg-secondary",
          },
          {
            id: "9",
            target: "7% Phase 1",
            minimun_tading_days: "",
            daily_starting_drawdown: "5%",
            overall_drawdown: "8%",
            available_Leverage: "1:100",
            assured_funding: "$500,000",
            refundable_registration_fee: "$1,400",
            account: "250,000",
            color_bg: "bg-primary",
          },
          {
            id: "10",
            target: "7% Phase 1",
            minimun_tading_days: "",
            daily_starting_drawdown: "5%",
            overall_drawdown: "8%",
            available_Leverage: "1:100",
            assured_funding: "$1,500,000",
            refundable_registration_fee: "$2,500",
            account: "500,000",
            color_bg: "bg-secondary",
          },
        ]
      }

    ]
    const activeTabName = ref('1')
    const alertsStore = useAlertsStore()
    const validate_email = ref(true)
    const email_input = ref("")
    const bodyStore = useBodyStore()
    let expandedNav: boolean = false

    onBeforeMount(() => {
      bodyStore.removeBodyClassName("*");
      bodyStore.addBodyClassname("bg-body");
    })

    const validateEmail = () => {
      const validator =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (validator.test(email_input.value)) {
        validate_email.value = false;
      } else {
        validate_email.value = true;
      }
    }

    const subscribeEmail = async () => {
      if (email_input.value.length < 6) return alertsStore.error("Invalid email format, minimum six characters.")
      try {
        const data = {
          email: email_input.value,
        }
        await axios.post("/subscription", data)
        email_input.value = ""
        alertsStore.success("Subscription done")

      } catch (error) {
        console.error(error)
        alertsStore.error("The email format is invalid, try again!")
      }
    }

    onMounted(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      });

      const hiddenElements = document.querySelectorAll(".hidden");
      hiddenElements.forEach((el) => observer.observe(el));
    })

    function toggleMenu() {
      expandedNav = !expandedNav;
      let navbarLinks = document.getElementById("navbarLinks");
      navbarLinks?.classList.toggle("show");
      console.log(expandedNav);
    }

    function toggleAccordion(e) {
      e.target.classList.toggle("active");

      let span = e.target.children;
      if (span[0].innerHTML === '<i class="fas fa-plus"></i>') {
        span[0].innerHTML = '<i class="fas fa-minus"></i>';
      } else {
        span[0].innerHTML = '<i class="fas fa-plus"></i>';
      }

      let panel = e.target.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    }

    window.onscroll = function () {
      scrollFunction();
    }

    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        document.querySelector(".nav-background")?.classList.add("show");
        // document.getElementById("navbar").style.background = "#0f0f0f77";
        // document.getElementById("signupBtn")?.classList.replace("btn-outline-dark", "btn-outline-light");
        // document.getElementById("signinBtn")?.classList.replace("btn-dark", "btn-primary")
      } else {
        document.querySelector(".nav-background")?.classList.remove("show");
        // document.getElementById("navbar").style.background = "initial";
        // document.getElementById("signupBtn")?.classList.replace("btn-outline-light", "btn-outline-dark");
        // document.getElementById("signinBtn")?.classList.replace("btn-primary", "btn-dark")
      }
    }

    return {
      expandedNav,
      toggleMenu,
      toggleAccordion,
      subscribeEmail,
      email_input,
      validate_email,
      validateEmail,
      router,
      programs,
      activeTabName
    }
  },
})
</script>

<style lang="scss">
@import "@/assets/sass/customStyles/landing";

.el-tabs__nav.is-left>.el-tabs__item {
  text-align: start !important;
  font-size: 16px;
  opacity: 0.5;
  font-weight: bold;
}

.el-tabs__nav.is-left>.el-tabs__item:hover {
  color: var(--bs-primary) !important;
}

.el-tabs__nav.is-left>.el-tabs__item.is-active {
  color: var(--bs-primary) !important;
  opacity: 1;
  font-weight: bolder;
}

.el-tabs__nav.is-left>.el-tabs__active-bar {
  background: var(--bs-primary) !important;
  width: 4px !important;
}

.el-collapse-item__header {
  background: none !important;
}

.el-icon.el-collapse-item__arrow>svg {
  transform: scale(2);
}

.el-icon.el-collapse-item__arrow.is-active>svg {
  color: var(--bs-primary) !important;
}

.el-collapse-item__wrap {
  background: none !important;
}</style>
