# Styling Guide

This project uses **Tailwind CSS** for styling and **Motion** for animations.

## Design System

### Colors

We use a custom color palette defined in `tailwind.config.js` (or implicitly via Tailwind's default palette).

-   **Backgrounds:** Dark themes use `zinc-900` or `black`.
-   **Text:**
    -   Primary: `white`
    -   Secondary: `zinc-400` or `zinc-500`
-   **Accents:** `emerald-500` for primary actions and highlights.

### Typography

-   **Font Family:**
    -   Sans: `Poppins` (default)
    -   Mono: `JetBrains Mono` (for code and technical details)
-   **Scale:** We follow Tailwind's default type scale.

### Spacing

We use Tailwind's spacing scale. Common spacing units:
-   Section padding: `py-32`
-   Container padding: `px-6`
-   Gap: `gap-4`, `gap-6`, `gap-8`

## Animation Strategy

We use `motion/react` for declarative animations.

### Common Patterns

1.  **Fade In Up:**
    Used for sections and cards entering the viewport.

    ```tsx
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Content */}
    </motion.div>
    ```

2.  **Staggered Children:**
    Used for lists or grids.

    ```tsx
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map(item => (
        <motion.div variants={itemVariants} key={item.id}>
          {/* Item Content */}
        </motion.div>
      ))}
    </motion.div>
    ```

3.  **Hover Effects:**
    Used for interactive elements.

    ```tsx
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Click Me
    </motion.button>
    ```

## CSS Architecture

-   **Global Styles:** `src/index.css` contains global resets and font imports.
-   **Utility Classes:** Most styling is done via utility classes directly in components.
-   **Arbitrary Values:** Used sparingly for specific, one-off values (e.g., `w-[calc(100%-3rem)]`).
