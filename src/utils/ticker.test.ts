import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMarqueeDuration,
  duplicateForInfiniteLoop,
  formatAzn,
  filterVillas,
  getStandaloneReactCode,
  getStandaloneVanillaHtmlCode,
} from './ticker';
import { VILLAS } from '../data/villas';

test('calculateMarqueeDuration scales with count and speed', () => {
  const normalDuration = calculateMarqueeDuration(6, 'normal');
  const fastDuration = calculateMarqueeDuration(6, 'fast');
  const slowDuration = calculateMarqueeDuration(6, 'slow');

  assert.equal(normalDuration, 36);
  assert.equal(fastDuration, 21);
  assert.equal(slowDuration, 54);
  assert.ok(slowDuration > normalDuration);
  assert.ok(normalDuration > fastDuration);
});

test('duplicateForInfiniteLoop correctly duplicates array for seamless loop', () => {
  const items = [1, 2, 3];
  const doubled = duplicateForInfiniteLoop(items, 2);
  assert.equal(doubled.length, 6);
  assert.deepEqual(doubled, [1, 2, 3, 1, 2, 3]);

  // Empty array handling
  assert.deepEqual(duplicateForInfiniteLoop([]), []);
});

test('formatAzn formats currency with Manat symbol', () => {
  const formatted = formatAzn(450);
  assert.ok(formatted.includes('450'));
  assert.ok(formatted.includes('₼'));
});

test('filterVillas filters accurately by region, type, and pool', () => {
  const qabalaOnly = filterVillas(VILLAS, { region: 'Qəbələ' });
  assert.ok(qabalaOnly.length >= 1);
  assert.ok(qabalaOnly.every((v) => v.region === 'Qəbələ'));

  const saleOnly = filterVillas(VILLAS, { type: 'Satış' });
  assert.ok(saleOnly.every((v) => v.type === 'Satış'));

  const withPoolOnly = filterVillas(VILLAS, { hasPool: true });
  assert.ok(withPoolOnly.every((v) => v.hasPool));
});

test('code generator functions produce valid strings', () => {
  const reactCode = getStandaloneReactCode();
  const htmlCode = getStandaloneVanillaHtmlCode();
  assert.ok(reactCode.includes('marqueeScroll'));
  assert.ok(reactCode.includes('translate3d(-50%, 0, 0)'));
  assert.ok(htmlCode.includes('translate3d'));
});
