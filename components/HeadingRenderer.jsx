import {
  Children, createElement, useEffect, useRef, useState,
} from 'react';
import CTP from 'convert-chinese-to-pinyin';
import { useRouter } from 'next/router';
import isElementInViewport from '../inViewPort';

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
  );

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}

function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props) {
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  const router = useRouter();

  const children = Children.toArray(props.children);
  const text = children.reduce(flatten, '');
  const slug = `${CTP(text)}-${props.node.position ? props.node.position.start.line - 1 : 'footnote'}`;

  useEffect(() => {
    history.scrollRestoration = 'manual';
    if (!slug.endsWith('-footnote')) {
      for (const el of document.querySelector(".content").querySelectorAll("h1, h2, h3, h4, h5, h6")) {
        if (isElementInViewport(el)) {
          props.setCurrent(el.id)
          break;
        }
      }
    };
  }, [isVisible]);

  return createElement(`h${props.level}`, { id: slug, ref }, props.children);
}

export default HeadingRenderer;
