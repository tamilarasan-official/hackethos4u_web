# Layout Shift Testing Checklist

## Quick Testing Guide

The dev server is running at: **http://localhost:8081/**

## Automated Performance Testing

### Option 1: Chrome DevTools Lighthouse
1. Open http://localhost:8081/ in Chrome
2. Open DevTools (F12)
3. Click the "Lighthouse" tab
4. Configuration:
   - ✅ Performance
   - ✅ Mode: Navigation
   - ✅ Device: Mobile & Desktop
5. Click "Analyze page load"
6. **Check CLS Score**: Should be < 0.1 (Green)

### Option 2: PageSpeed Insights (Production only)
```
https://pagespeed.web.dev/
```
Note: Only works with deployed URLs, not localhost

## Manual Visual Testing

### 1. Contact Section Testing
**Location**: Scroll to the bottom of the home page

**Test Steps:**
- [ ] Load page with DevTools Network tab throttled to "Slow 3G"
- [ ] Observe the Contact Section as it loads
- [ ] Verify the "GET IN TOUCH" badge doesn't shift position
- [ ] Verify the heading and description stay stable
- [ ] Check that form fields maintain consistent height
- [ ] Verify contact info cards don't jump around
- [ ] Test on mobile (375px), tablet (768px), and desktop (1280px)

**Expected Result:**
✅ No visible content movement during load or interaction

### 2. Hero Slider Testing
**Location**: Top of the home page

**Test Steps:**
- [ ] Watch the slide indicators at the bottom of the hero
- [ ] Let slides auto-advance (every 8 seconds)
- [ ] Click different slide indicators manually
- [ ] Verify indicators don't cause width changes in the container
- [ ] Check that inactive dots (2px wide) and active bars (40-48px) don't shift other elements

**Expected Result:**
✅ Indicators animate smoothly without affecting layout

### 3. Font Loading Testing
**Test Steps:**
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Open DevTools Network tab
- [ ] Filter to "Font" resources
- [ ] Reload page (Ctrl+R)
- [ ] Observe text rendering - should show fallback font immediately
- [ ] Watch for font swap - should be smooth without text jumping

**Expected Result:**
✅ Text visible immediately, smooth font swap, no layout shift

## Detailed CLS Testing

### Using Chrome DevTools Performance
1. Open http://localhost:8081/
2. Open DevTools (F12) → Performance tab
3. Click "Record" (circle icon)
4. Reload page
5. Scroll through entire page
6. Stop recording
7. Look for red bars labeled "Layout Shift" in the timeline
8. Click on any shift to see which element caused it

**Expected Result:**
✅ Minimal or no layout shift events (red bars)
✅ Layout Shift Score < 0.1

### Using Layout Shift Regions (Chrome 88+)
1. Open DevTools → Settings (⚙️)
2. Experiments → Enable "Layout Shift Regions"
3. DevTools → Rendering tab
4. Enable "Layout Shift Regions"
5. Reload page
6. Watch for blue highlights (indicates shifting elements)

**Expected Result:**
✅ No blue highlights during page load

## Performance Targets

| Metric | Good | Needs Improvement | Poor | Our Target |
|--------|------|-------------------|------|------------|
| CLS | < 0.1 | 0.1 - 0.25 | > 0.25 | **< 0.05** |
| LCP | < 2.5s | 2.5s - 4.0s | > 4.0s | **< 2.0s** |
| FID | < 100ms | 100ms - 300ms | > 300ms | **< 50ms** |
| FCP | < 1.8s | 1.8s - 3.0s | > 3.0s | **< 1.5s** |

## Before vs After Comparison

### Previous Issues (CLS 0.558)
❌ Contact section header height causing shifts
❌ Form elements loading with dynamic heights
❌ Contact info cards shifting during render
❌ Hero slider indicators changing container width
❌ Font loading causing text reflow

### Fixed (Expected CLS < 0.05)
✅ Fixed dimensions on all Contact section elements
✅ Stable form field heights (h-10, h-[120px])
✅ Fixed container heights (min-h-[340px], min-h-[650px])
✅ Hero slider indicators in fixed-width containers
✅ Font display swap with proper fallbacks

## Browser Testing Matrix

Test on these browsers to ensure cross-browser compatibility:

- [ ] Chrome (Latest) - Primary target
- [ ] Firefox (Latest)
- [ ] Safari (Latest) - macOS/iOS
- [ ] Edge (Latest)
- [ ] Mobile Chrome - Android
- [ ] Mobile Safari - iOS

## Screen Size Testing

- [ ] Mobile: 375px × 667px (iPhone SE)
- [ ] Mobile: 390px × 844px (iPhone 12)
- [ ] Tablet: 768px × 1024px (iPad)
- [ ] Desktop: 1280px × 720px
- [ ] Desktop: 1920px × 1080px

## Network Throttling Testing

Test with different network speeds to catch loading shifts:

- [ ] Fast 3G (750 Kbps)
- [ ] Slow 3G (400 Kbps)
- [ ] Offline (Service Worker cache)
- [ ] No throttling (Fast connection)

## Issue Reporting Template

If you find layout shift issues:

```markdown
**Element**: [Which element shifted]
**Location**: [Page section]
**CLS Score**: [Number from Lighthouse]
**Browser**: [Chrome/Firefox/Safari + version]
**Screen Size**: [Width x Height]
**Network**: [Throttling setting]
**Steps to Reproduce**:
1.
2.
3.

**Expected**: [What should happen]
**Actual**: [What actually happened]

**Screenshot/Video**: [Attach if possible]
```

## Success Criteria

### ✅ Test Passed If:
1. Lighthouse CLS score < 0.1 (preferably < 0.05)
2. No visible content jumps during page load
3. Smooth transitions between slider states
4. Text appears immediately (no FOIT)
5. Responsive design works on all screen sizes
6. Performance consistent across browsers

### ❌ Test Failed If:
1. CLS score > 0.1
2. Visible content movement during load
3. Form fields resize after render
4. Slider indicators cause width changes
5. Text invisible during font load
6. Layout breaks on any device size

## Quick Validation Commands

### Build and Preview Production
```bash
npm run build
npm run preview
```
Then test production build at the provided URL

### Run Performance Audit
```bash
# Install Lighthouse CLI (if not installed)
npm install -g lighthouse

# Run audit
lighthouse http://localhost:8081/ --view --output html --output-path ./lighthouse-report.html
```

## Next Steps After Testing

1. ✅ **If CLS < 0.1**: Ready for deployment
2. ⚠️ **If CLS 0.1-0.25**: Review specific shifting elements, apply additional fixes
3. ❌ **If CLS > 0.25**: Critical issues - investigate with Performance profiler

---

**Testing Status**: 🟡 Pending
**Last Updated**: 2025-11-23
**Tested By**: _______
**Results**: _______
