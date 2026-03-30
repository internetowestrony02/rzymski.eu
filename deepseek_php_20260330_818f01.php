<?php
/*
Template Name: Cennik
*/
get_header(); ?>

<section class="cennik">
    <div class="container">
        <h2><?php the_title(); ?></h2>
        <?php the_content(); ?>
        <table class="cennik-table">
            <tr><th>Usługa</th><th>Cena</th></tr>
            <tr><td>Przykładowa usługa 1</td><td>100 zł</td></tr>
            <tr><td>Przykładowa usługa 2</td><td>200 zł</td></tr>
        </table>
    </div>
</section>

<?php get_footer(); ?>