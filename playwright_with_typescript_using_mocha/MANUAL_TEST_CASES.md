# Douglas.de Manual Test Cases

## 📋 Document Information

- **Application Under Test**: Douglas.de E-commerce Website
- **Test Focus**: Parfum Category - Product Filtering & Search
- **Base URL**: https://www.douglas.de/de
- **Last Updated**: January 2026
- **Version**: 1.0

---

## 🎯 Test Scope

This document contains manual test cases derived from automated test specifications for the Douglas.de parfum category. The test cases cover:

- Product filtering functionality
- Filter removal and reset
- Brand-based filtering
- Highlights/badges filtering (Sale, NEU, Limitiert)
- Product data validation

---

## 📝 Test Case Template

Each test case follows this structure:
- **Test Case ID**: Unique identifier
- **Test Scenario**: Brief description
- **Priority**: Critical / High / Medium / Low
- **Preconditions**: Setup requirements
- **Test Steps**: Detailed step-by-step instructions
- **Expected Results**: What should happen at each step
- **Test Data**: Input values used
- **Postconditions**: Cleanup or state after test

---

## 🧪 Test Cases

### **TC-001: Filter Products Using Produktart**

| **Field** | **Details** |
|-----------|-------------|
| **Test Case ID** | TC-001 |
| **Test Scenario** | Verify that users can filter parfum products by "Produktart" and see only relevant products |
| **Priority** | Critical |
| **Test Type** | Functional - Positive |
| **Module** | Product Filtering |

#### **Preconditions**
- User has internet connection
- Douglas.de website is accessible
- Browser is supported (Chrome, Firefox, Edge, Safari)

#### **Test Steps**

| **Step** | **Action** | **Expected Result** |
|----------|------------|---------------------|
| 1 | Navigate to https://www.douglas.de/de | Homepage loads successfully with all elements visible |
| 2 | Handle cookie consent popup (if appears) | Click "Accept" or close the cookie banner |
| 3 | Navigate to "Parfum" category from main menu | Parfum category page loads with product listings |
| 4 | Locate the filter panel on the left side | Filter panel is visible with multiple filter categories |
| 5 | Click on "Produktart" filter category | Filter options expand showing available product types |
| 6 | Select "Parfum" checkbox from the filter options | Checkbox is checked/selected |
| 7 | Click "Apply" or close the filter dialog | Page refreshes/updates with filtered results |
| 8 | Observe the product listing area | Products are displayed (count > 0) |
| 9 | Verify the first product's category label | Category shows "Parfum" text |
| 10 | Scroll through visible products | All visible products show "Parfum" as category |

#### **Expected Results**
- ✅ Filter is successfully applied
- ✅ Product count is greater than 0
- ✅ All displayed products have category = "Parfum"
- ✅ Product grid updates without errors
- ✅ Filter selection is visually indicated (active state)

#### **Test Data**
```
Filter Type: Produktart
Filter Value: Parfum
```

#### **Postconditions**
- Filter remains applied until manually removed
- Product count reflects filtered results

---

### **TC-002: Remove Applied Filter and Validate Product List Refresh**

| **Field** | **Details** |
|-----------|-------------|
| **Test Case ID** | TC-002 |
| **Test Scenario** | Verify that removing filters restores the complete product list |
| **Priority** | High |
| **Test Type** | Functional - Positive |
| **Module** | Product Filtering |

#### **Preconditions**
- User is on Douglas.de homepage
- At least one filter is already applied (e.g., from TC-001)

#### **Test Steps**

| **Step** | **Action** | **Expected Result** |
|----------|------------|---------------------|
| 1 | Navigate to https://www.douglas.de/de | Homepage loads successfully |
| 2 | Navigate to "Parfum" category | Parfum page loads |
| 3 | Apply filter: Produktart → Parfum | Filter is applied, products are filtered |
| 4 | Note the current product count | Count is recorded (e.g., 150 products) |
| 5 | Locate "Clear All Filters" or "X" button on active filter | Clear button/link is visible |
| 6 | Click "Clear All Filters" button | Filter is removed from active filters list |
| 7 | Observe the product listing area | Page refreshes/reloads |
| 8 | Count the products displayed | Product count increases (more products shown) |
| 9 | Verify filter panel shows no active filters | No filters are in selected/active state |
| 10 | Verify product variety | Products from different categories are visible |

#### **Expected Results**
- ✅ Filter is successfully removed
- ✅ Product count increases (unfiltered list)
- ✅ Product list refreshes automatically
- ✅ No active filters are shown in the filter panel
- ✅ All product types are visible (not just "Parfum")

#### **Test Data**
```
Initial Filter: Produktart → Parfum
Action: Clear all filters
```

#### **Postconditions**
- No filters are active
- Full product catalog is displayed

---

### **TC-003: Brand-Based Filtering (Calvin Klein)**

| **Field** | **Details** |
|-----------|-------------|
| **Test Case ID** | TC-003 |
| **Test Scenario** | Verify that users can filter products by specific brand in a subcategory |
| **Priority** | High |
| **Test Type** | Functional - Positive |
| **Module** | Product Filtering - Brand |

#### **Preconditions**
- User is on Douglas.de homepage
- Calvin Klein products exist in the Deodorants category

#### **Test Steps**

| **Step** | **Action** | **Expected Result** |
|----------|------------|---------------------|
| 1 | Navigate to https://www.douglas.de/de | Homepage loads successfully |
| 2 | Navigate to "Parfum" category | Parfum category page loads |
| 3 | Hover over or click "Damendüfte" subcategory | Subcategory menu expands |
| 4 | Click on "Deodorants" link | Deodorants page loads with product listings |
| 5 | Wait for page to fully load | All products and filters are visible |
| 6 | Locate "Marke" (Brand) filter in the filter panel | Brand filter category is visible |
| 7 | Click on "Marke" filter to expand options | Brand list expands showing available brands |
| 8 | Search or scroll to find "CALVIN KLEIN" | Calvin Klein option is visible |
| 9 | Select "CALVIN KLEIN" checkbox | Checkbox is checked |
| 10 | Click "Apply" or close filter dialog | Page updates with filtered results |
| 11 | Verify product count is greater than 0 | Products are displayed |
| 12 | Check the brand name on first 5 products | All show "CALVIN KLEIN" or "Calvin Klein" |
| 13 | Scroll through all visible products | All products display Calvin Klein branding |

#### **Expected Results**
- ✅ Navigation to subcategory is successful
- ✅ Brand filter is applied correctly
- ✅ Only Calvin Klein products are displayed
- ✅ Product count > 0
- ✅ All visible products show "CALVIN KLEIN" brand
- ✅ No products from other brands are visible

#### **Test Data**
```
Category: Parfum
Subcategory: Damendüfte
Product Type: Deodorants
Filter Type: Marke (Brand)
Filter Value: CALVIN KLEIN
```

#### **Postconditions**
- Brand filter remains active
- Only Calvin Klein products are visible

---

### **TC-004: Data-Driven Filter Testing - Produktart**

| **Field** | **Details** |
|-----------|-------------|
| **Test Case ID** | TC-004 |
| **Test Scenario** | Verify filtering by Produktart category and extract product details |
| **Priority** | Medium |
| **Test Type** | Functional - Data Validation |
| **Module** | Product Filtering - Data Extraction |

#### **Preconditions**
- User is on Douglas.de homepage
- Products exist in the Parfum category

#### **Test Steps**

| **Step** | **Action** | **Expected Result** |
|----------|------------|---------------------|
| 1 | Navigate to https://www.douglas.de/de | Homepage loads successfully |
| 2 | Navigate to "Parfum" category | Parfum page loads with products |
| 3 | Click on "Produktart" filter category | Filter options expand |
| 4 | Select the first available option | First filter option is selected |
| 5 | Apply the filter | Products are filtered |
| 6 | Extract details from visible products:<br>- Brand name<br>- Product name<br>- Category<br>- Gender (if visible)<br>- Badges (Sale, NEU, Limitiert) | All product details are visible and extractable |
| 7 | Record total product count | Count is recorded |
| 8 | Verify at least 1 product is displayed | Product count > 0 |

#### **Expected Results**
- ✅ Filter is applied successfully
- ✅ Product details are clearly visible
- ✅ Each product shows: Brand, Name, Category
- ✅ Badges/highlights are visible (if applicable)
- ✅ Product count is accurate

#### **Test Data**
```
Filter Category: Produktart
Filter Value: First available option
```

---

### **TC-005: Data-Driven Filter Testing - Marke (Brand)**

| **Field** | **Details** |
|-----------|-------------|
| **Test Case ID** | TC-005 |
| **Test Scenario** | Verify filtering by Marke (Brand) and validate product data |
| **Priority** | Medium |
| **Test Type** | Functional - Data Validation |
| **Module** | Product Filtering - Brand |

#### **Preconditions**
- User is on Douglas.de homepage
- Multiple brands are available in the Parfum category

#### **Test Steps**

| **Step** | **Action** | **Expected Result** |
|----------|------------|---------------------|
| 1 | Navigate to https://www.douglas.de/de | Homepage loads successfully |
| 2 | Navigate to "Parfum" category | Parfum page loads |
| 3 | Click on "Marke" filter category | Brand filter options expand |
| 4 | Select the first available brand | Brand checkbox is selected |
| 5 | Apply the filter | Products are filtered by selected brand |
| 6 | Verify all products show the selected brand | Brand consistency across all products |
| 7 | Extract product details (same as TC-004) | All details are visible |

#### **Expected Results**
- ✅ Brand filter works correctly
- ✅ All products match the selected brand
- ✅ Product data is consistent

#### **Test Data**
```
Filter Category: Marke
Filter Value: First available brand
```

---

### **TC-006: Data-Driven Filter Testing - Für Wen (Gender)**

| **Field** | **Details** |
|-----------|-------------|
| **Test Case ID** | TC-006 |
| **Test Scenario** | Verify filtering by "Für Wen" (Gender) category |
| **Priority** | Medium |
| **Test Type** | Functional - Data Validation |
| **Module** | Product Filtering - Gender |

#### **Preconditions**
- User is on Douglas.de homepage
- Products exist for different genders

#### **Test Steps**

| **Step** | **Action** | **Expected Result** |
|----------|------------|---------------------|
| 1 | Navigate to https://www.douglas.de/de | Homepage loads successfully |
| 2 | Navigate to "Parfum" category | Parfum page loads |
| 3 | Click on "Für Wen" filter category | Gender filter options expand |
| 4 | Select first available option (e.g., Weiblich, Männlich, Unisex) | Option is selected |
| 5 | Apply the filter | Products are filtered by gender |
| 6 | Verify products match the selected gender | Gender information is consistent |
| 7 | Extract and validate product details | All details are accurate |

#### **Expected Results**
- ✅ Gender filter is applied
- ✅ Products match selected gender
- ✅ Product count > 0

#### **Test Data**
```
Filter Category: Für Wen
Filter Value: First available option
```

---

### **TC-007: Highlights Filter - Sale Products**

| **Field** | **Details** |
|-----------|-------------|
| **Test Case ID** | TC-007 |
| **Test Scenario** | Verify filtering products with "Sale" badge/highlight |
| **Priority** | High |
| **Test Type** | Functional - Highlights |
| **Module** | Product Filtering - Badges |

#### **Preconditions**
- User is on Douglas.de homepage
- Sale products exist in the catalog

#### **Test Steps**

| **Step** | **Action** | **Expected Result** |
|----------|------------|---------------------|
| 1 | Navigate to https://www.douglas.de/de | Homepage loads successfully |
| 2 | Navigate to "Parfum" category | Parfum page loads |
| 3 | Apply any base filter (e.g., Produktart) | Base filter is applied |
| 4 | Locate "Highlights" or similar filter category | Highlights filter is visible |
| 5 | Select "Sale" option | Sale filter is applied |
| 6 | Verify products displayed have "Sale" badge | All products show Sale badge/label |
| 7 | Count products with Sale badge | Count matches filtered results |
| 8 | Extract product details:<br>- Brand<br>- Name<br>- Category<br>- Gender<br>- Badges (should include "Sale") | All products have Sale badge |

#### **Expected Results**
- ✅ Sale filter is applied successfully
- ✅ All displayed products have "Sale" badge
- ✅ Product count > 0
- ✅ Sale badge is clearly visible on product tiles

#### **Test Data**
```
Filter Category: Highlights
Filter Value: Sale
```

---

### **TC-008: Highlights Filter - NEU (New) Products**

| **Field** | **Details** |
|-----------|-------------|
| **Test Case ID** | TC-008 |
| **Test Scenario** | Verify filtering products with "NEU" (New) badge |
| **Priority** | High |
| **Test Type** | Functional - Highlights |
| **Module** | Product Filtering - Badges |

#### **Preconditions**
- User is on Douglas.de homepage
- New products exist in the catalog

#### **Test Steps**

| **Step** | **Action** | **Expected Result** |
|----------|------------|---------------------|
| 1 | Navigate to https://www.douglas.de/de | Homepage loads successfully |
| 2 | Navigate to "Parfum" category | Parfum page loads |
| 3 | Apply base filter (if needed) | Filter is applied |
| 4 | Locate "Highlights" filter category | Highlights filter is visible |
| 5 | Select "NEU" option | NEU filter is applied |
| 6 | Verify products have "NEU" badge | All products show NEU badge |
| 7 | Extract and validate product details | All products have NEU badge |

#### **Expected Results**
- ✅ NEU filter works correctly
- ✅ All products display "NEU" badge
- ✅ Product count > 0

#### **Test Data**
```
Filter Category: Highlights
Filter Value: NEU
```

---

### **TC-009: Highlights Filter - Limitiert (Limited) Products**

| **Field** | **Details** |
|-----------|-------------|
| **Test Case ID** | TC-009 |
| **Test Scenario** | Verify filtering products with "Limitiert" (Limited Edition) badge |
| **Priority** | Medium |
| **Test Type** | Functional - Highlights |
| **Module** | Product Filtering - Badges |

#### **Preconditions**
- User is on Douglas.de homepage
- Limited edition products exist in the catalog

#### **Test Steps**

| **Step** | **Action** | **Expected Result** |
|----------|------------|---------------------|
| 1 | Navigate to https://www.douglas.de/de | Homepage loads successfully |
| 2 | Navigate to "Parfum" category | Parfum page loads |
| 3 | Apply base filter (if needed) | Filter is applied |
| 4 | Locate "Highlights" filter category | Highlights filter is visible |
| 5 | Select "Limitiert" option | Limitiert filter is applied |
| 6 | Verify products have "Limitiert" badge | All products show Limitiert badge |
| 7 | Extract and validate product details | All products have Limitiert badge |

#### **Expected Results**
- ✅ Limitiert filter works correctly
- ✅ All products display "Limitiert" badge
- ✅ Product count > 0 (if limited products exist)

#### **Test Data**
```
Filter Category: Highlights
Filter Value: Limitiert
```

---

### **TC-010: Multiple Filters Combination**

| **Field** | **Details** |
|-----------|-------------|
| **Test Case ID** | TC-010 |
| **Test Scenario** | Verify that multiple filters can be applied simultaneously |
| **Priority** | High |
| **Test Type** | Functional - Combination |
| **Module** | Product Filtering - Multi-Filter |

#### **Preconditions**
- User is on Douglas.de homepage
- Products exist matching multiple filter criteria

#### **Test Steps**

| **Step** | **Action** | **Expected Result** |
|----------|------------|---------------------|
| 1 | Navigate to https://www.douglas.de/de | Homepage loads successfully |
| 2 | Navigate to "Parfum" category | Parfum page loads |
| 3 | Apply first filter: Produktart → Parfum | Filter 1 is applied |
| 4 | Apply second filter: Marke → CALVIN KLEIN | Filter 2 is applied |
| 5 | Apply third filter: Highlights → Sale | Filter 3 is applied |
| 6 | Verify all three filters are active | All filters show as active/selected |
| 7 | Verify products match ALL filter criteria:<br>- Category = Parfum<br>- Brand = CALVIN KLEIN<br>- Badge = Sale | Products meet all criteria |
| 8 | Note product count | Count reflects combined filters |

#### **Expected Results**
- ✅ Multiple filters can be applied together
- ✅ Products match ALL selected criteria
- ✅ Filter combination works as expected (AND logic)
- ✅ Product count is accurate for combined filters

#### **Test Data**
```
Filter 1: Produktart → Parfum
Filter 2: Marke → CALVIN KLEIN
Filter 3: Highlights → Sale
```

---

## 📊 Test Execution Summary Template

| **Test Case ID** | **Test Scenario** | **Priority** | **Status** | **Executed By** | **Date** | **Comments** |
|------------------|-------------------|--------------|------------|-----------------|----------|--------------|
| TC-001 | Filter by Produktart | Critical | | | | |
| TC-002 | Remove Filter | High | | | | |
| TC-003 | Brand Filter (Calvin Klein) | High | | | | |
| TC-004 | Data-Driven - Produktart | Medium | | | | |
| TC-005 | Data-Driven - Marke | Medium | | | | |
| TC-006 | Data-Driven - Für Wen | Medium | | | | |
| TC-007 | Highlights - Sale | High | | | | |
| TC-008 | Highlights - NEU | High | | | | |
| TC-009 | Highlights - Limitiert | Medium | | | | |
| TC-010 | Multiple Filters | High | | | | |

**Status Values**: ✅ Pass | ❌ Fail | ⏸️ Blocked | ⏭️ Skipped | 🔄 In Progress

---

## 🐛 Defect Reporting Template

When a test case fails, use this template to report defects:

```
Defect ID: BUG-XXX
Test Case ID: TC-XXX
Severity: Critical / High / Medium / Low
Priority: P1 / P2 / P3 / P4

Summary:
[Brief description of the issue]

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected Result:
[What should happen]

Actual Result:
[What actually happened]

Environment:
- Browser: [Chrome/Firefox/Safari/Edge]
- Browser Version: [Version number]
- OS: [Windows/Mac/Linux]
- Screen Resolution: [Resolution]

Attachments:
- Screenshot: [Attach screenshot]
- Video: [Attach video if available]
- Console Logs: [Browser console errors]
```

---

## 📝 Test Data Reference

### Filter Categories
- **Produktart** (Product Type)
- **Marke** (Brand)
- **Für Wen** (Gender/Target Audience)

### Highlights/Badges
- **Sale** - Products on sale
- **NEU** - New products
- **Limitiert** - Limited edition products

### Sample Brands
- CALVIN KLEIN
- DIOR
- CHANEL
- HUGO BOSS
- (Others as available on the website)

### Sample Product Types
- Parfum
- Eau de Toilette
- Eau de Parfum
- Deodorants
- Body Spray

---

## 🔍 Testing Notes

### Important Considerations

1. **Cookie Consent**: Always handle cookie popups before proceeding with tests
2. **Page Load Time**: Wait for complete page load before interacting with filters
3. **Dynamic Content**: Product availability may change; adjust expectations accordingly
4. **Browser Compatibility**: Test across multiple browsers (Chrome, Firefox, Safari, Edge)
5. **Responsive Design**: Test on different screen sizes (Desktop, Tablet, Mobile)
6. **Network Speed**: Slower connections may require longer wait times
7. **Anti-Bot Measures**: Avoid rapid clicking; use natural interaction patterns

### Known Issues/Limitations

- Some filters may not be available depending on product availability
- Product counts may vary based on inventory
- Limited edition products may not always be available
- Sale products depend on current promotions

---

## 📞 Contact Information

For questions or clarifications regarding these test cases:

- **Test Lead**: [Name]
- **Email**: [Email]
- **Project**: Douglas.de Automation Assessment

---

**Document Version**: 1.0  
**Last Updated**: January 2026  
**Based on Automated Test Specs**: parfum-filter.spec.ts, parfum-datadriven.spec.ts
