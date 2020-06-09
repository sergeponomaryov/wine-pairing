<template>
  <div class="container min-vh-100 d-flex justify-content-center" id="app">
    <div class="row align-self-center text-center">
      <transition name="fade" mode="out-in" appear>
        <div v-if="step == 1" key="1">
          <h1>Hi! What are you eating? 😋</h1>
          <h3>I will find the right food and wine pairing for you 🍷</h3>
          <div class="buttons-block">
            <button
              type="button"
              class="btn btn-light btn-lg"
              v-for="item in ingredients.main"
              :key="item.id"
              @click="select(item.id)"
            >{{ item.label }}</button>
          </div>
        </div>
        <div v-if="step == 2" key="2">
          <h1 v-if="selections[0] != null">What are you having it with? 🤔</h1>
          <h1 v-else>What then? 🤔</h1>
          <div class="buttons-block">
            <button
              type="button"
              class="btn btn-light btn-lg"
              v-for="item in ingredients.secondary"
              :key="item.id"
              @click="select(item.id)"
            >{{ item.label }}</button>
            <button type="button" class="btn btn-light btn-lg" @click="back()">← Go back</button>
          </div>
        </div>
        <div v-if="step == 3" key="3">
          <h1>How is it prepared? 👨‍🍳</h1>
          <div class="buttons-block">
            <button
              type="button"
              class="btn btn-light btn-lg"
              v-for="item in ingredients.prep"
              :key="item.id"
              @click="select(item.id)"
            >{{ item.label }}</button>
            <button type="button" class="btn btn-light btn-lg" @click="back()">← Go back</button>
          </div>
        </div>
        <div v-if="step == 4" key="4">
          <h1>Any spices? 🌶</h1>
          <div class="buttons-block">
            <button
              type="button"
              class="btn btn-light btn-lg"
              v-for="item in ingredients.spice"
              :key="item.id"
              @click="select(item.id)"
            >{{ item.label }}</button>
            <button type="button" class="btn btn-light btn-lg" @click="back()">← Go back</button>
          </div>
        </div>
        <div v-if="step == 5" key="5">
          <div v-if="selections.length">
            <h1>Try these wines 🍷</h1>

            <div class="results-wine-type" v-for="result in results" :key="result.name">
              <div class="result-name">
                <span class="grape-type-name">{{ result.name }}</span>
                <span class="grape-type-like">like {{ result.examples.join(', ') }}</span>
              </div>
              <div class="progress-wrapper d-flex result-progress">
                <div :class="`progress progress-${result.id} align-self-center`">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    :style="'width: ' + result.match + '%'"
                    :aria-valuenow="result.match"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div class="progress-percentage">{{ result.match }}%</div>
              </div>
              <div
                class="result-perfect"
                v-if="result.perfectMatches.length"
              >Perfect with {{ result.perfectMatches.join(' and ') }}</div>
            </div>

            <h5>Wondering where to shop for great wines? Try our sponsors <a href="https://www.kqzyfj.com/click-100146565-10570217">WineBasket</a> and <a href="https://www.jdoqocy.com/click-100146565-14043910">Splash Wines</a> 🛒</h5>
            <br>

          </div>
          <div v-else>
            <h1>So you're not eating anything... 🤦‍♂️</h1>
          </div>
          <button
            type="button"
            class="btn btn-dark btn-lg"
            @click="selections = []; step = 1;"
          >Start Over</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import data from "./data.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
const logic = require("./logic.js");

export default {
  data() {
    return {
      ingredients: {
        main: data.ingredients.filter(ingredient => ingredient.type == "main"),
        secondary: data.ingredients.filter(ingredient => ingredient.type == "secondary"),
        prep: data.ingredients.filter(ingredient => ingredient.type == "prep"),
        spice: data.ingredients.filter(ingredient => ingredient.type == "spice")
      },
      step: 1,
      selections: [],
      results: [],
      isDisabled: false
    };
  },
  methods: {
    select(itemId) {
      // block button for 250ms to prevent double clicks
      if (this.isDisabled) return;
      this.isDisabled = true;
      this.selections[this.step - 1] = itemId;
      this.step++;
      setTimeout(() => {
        this.isDisabled = false;
      }, 250);
    },
    back() {
      window.history.back();
    },
    setStepByHash() {
      let step = location.hash.substr(1);
      if (!step) step = 1;
      if (step >= 1 && step <= 5) this.step = step;
    }
  },
  watch: {
    step: function() {
      if (this.step == 5) {
        this.selections = this.selections.filter(x => x); // remove null values
        this.results = logic.rankWineTypes(this.selections);
      } else {
        // clear the selection on this step in case user went back
        this.selections[this.step - 1] = null;
      }
      location.hash = "#" + this.step;
    }
  },
  mounted() {
    window.addEventListener("hashchange", this.setStepByHash, false);
    // reset any step in hash upon load
    location.hash = "";
  }
};
</script>