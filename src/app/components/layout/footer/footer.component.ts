import { Component, ElementRef, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  scroller: Subscription;
  buttonFlag: boolean = false;
  constructor() {
    let setFlag = () => {
      this.buttonFlag = true;
    };
    let heroEle = document.getElementById('heroImage');
    let sec = document.getElementById('section2');
    this.scroller = fromEvent(window, 'scroll').subscribe(() => {
      if (!this.elementInViewport(heroEle)) {
        let timer;
        this.buttonFlag = false;
        clearTimeout(timer);
        timer = setTimeout(() => {
          setFlag();
        }, 1500);
      } else {
        this.buttonFlag = false;
      }
    });
  }

  ngOnInit(): void {}

  /**
   * Check Which Section in viewPort
   * @param el
   */
  elementInViewport(el: any) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.pageYOffset + window.innerHeight &&
      left < window.pageXOffset + window.innerWidth &&
      top + height > window.pageYOffset &&
      left + width > window.pageXOffset
    );
  }

  ngOnDestroy() {
    this.scroller.unsubscribe();
  }
}
