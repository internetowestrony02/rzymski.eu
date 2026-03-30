<?php get_header(); ?>

<div class="hero">
    <div class="container">
        <h1><?php bloginfo('name'); ?></h1>
        <p><?php bloginfo('description'); ?></p>
    </div>
</div>

<section class="aktualnosci">
    <div class="container">
        <h2>Aktualności</h2>
        <div class="aktualnosci-grid">
            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                <div class="aktualnosc">
                    <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                    <div class="data"><?php echo get_the_date(); ?></div>
                    <div class="wpis-tekst"><?php the_excerpt(); ?></div>
                </div>
            <?php endwhile; endif; ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>