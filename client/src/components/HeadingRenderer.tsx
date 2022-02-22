/* eslint-disable react/destructuring-assignment */
import {
  Children, createElement, RefObject, useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import CTP from 'convert-chinese-to-pinyin';

function useOnScreen(ref: RefObject<any>) {
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

function flatten(text: string, child: any): any {
  return typeof child === 'string'
    ? text + child
    : Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props: any) {
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  const navigate = useNavigate();

  const children = Children.toArray(props.children);
  const text = children.reduce(flatten, '');
  const slug = `${CTP(text)}-${props.node.position ? props.node.position.start.line - 1 : 'footnote'}`;

  useEffect(() => {
    if (isVisible && !slug.endsWith('-footnote')) navigate(`#${slug}`);
  }, [isVisible]);

  return createElement(`h${props.level}`, { id: slug, ref }, props.children);
}

export default HeadingRenderer;
