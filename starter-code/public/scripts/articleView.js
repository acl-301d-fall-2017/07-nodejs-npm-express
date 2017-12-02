'use strict';

const articleView = {};

articleView.populateFilters = () => {
    $('article').each(function() {
        if (!$(this).hasClass('template')) {
            let val = $(this).find('address a').text();
            let optionTag = `<option value="${val}">${val}</option>`;

            if ($(`#author-filter option[value="${val}"]`).length === 0) {
                $('#author-filter').append(optionTag);
            }

            val = $(this).attr('data-category');
            optionTag = `<option value="${val}">${val}</option>`;
            if ($(`#category-filter option[value="${val}"]`).length === 0) {
                $('#category-filter').append(optionTag);
            }
        }
    });
};

articleView.handleAuthorFilter = () => {
    $('#author-filter').on('change', function() {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-author="${$(this).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#category-filter').val('');
    });
};

articleView.handleCategoryFilter = () => {
    $('#category-filter').on('change', function() {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-category="${$(this).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#author-filter').val('');
    });
};

articleView.handleMainNav = () => {
    $('.main-nav').on('click', '.tab', function() {
        $('.tab-content').hide();
        $(`#${$(this).data('content')}`).fadeIn();
    });

    $('.main-nav .tab:first').click();
};

articleView.setTeasers = () => {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click', 'a.read-on', function(e) {
        e.preventDefault();
        if ($(this).text() === 'Read on →') {
            $(this).parent().find('*').fadeIn();
            $(this).html('Show Less &larr;');
        } else {
            $('body').animate({
                scrollTop: ($(this).parent().offset().top)
            },200);
            $(this).html('Read on &rarr;');
            $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
        }
    });
};

// COMMENT: When/where is this function invoked? What event ultimately triggers its execution? Explain the sequence of code execution when this function is invoked.
// This function is invoked at the bottom of the new.html file. It's triggered when a user visits the new.html page. On page load, the section with the class of 'tab-content' (the form) is shown. The preview is hidden until the user starts inputing data, at which point the articleView.create function is called. 

articleView.initNewArticlePage = () => {
    $('.tab-content').show();
    $('#export-field').hide();
    $('#article-json').on('focus', function(){
        this.select();
    });

    $('#new-form').on('change', 'input, textarea', articleView.create);
    $('#new-form').on('submit', articleView.submit);
};

// COMMENT: When is this function called? What event ultimately triggers its execution?
// This function is called within the initNewArticlePage function (above). It's triggered when a change (event) is detected in one of the form's (with the ID of new-form) inputs or text areas.
articleView.create = () => {
    let article;
    $('#articles').empty();

    article = new Article({
        title: $('#article-title').val(),
        author: $('#article-author').val(),
        authorUrl: $('#article-author-url').val(),
        category: $('#article-category').val(),
        body: $('#article-body').val(),
        publishedOn: $('#article-published:checked').length ? new Date() : null
    });

    $('#articles').append(article.toHtml());

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    $('#export-field').show();
    $('#article-json').val(`${JSON.stringify(article)},`);
};

// COMMENT: When is this function called? What event ultimately triggers its execution?
// This function is also called within the initNewArticlePage function (above). It's triggered when the user hits the 'submit' button.

articleView.submit = event => {
    event.preventDefault();
    const article = new Article({
        title: $('#article-title').val(),
        author: $('#article-author').val(),
        authorUrl: $('#article-author-url').val(),
        category: $('#article-category').val(),
        body: $('#article-body').val(),
        publishedOn: $('#article-published:checked').length ? new Date() : null
    });

    // COMMENT: Where is this function defined? When is this function called? What event ultimately triggers its execution?
    // This function is defined in article.js file, in the Article.prototype.insertRecord function. It's called below, within in the articleView.submit, which is called within the articleView.initNewArticlePage, which is triggered when the user hits the submit button.
    article.insertRecord();
};

articleView.initIndexPage = () => {
    Article.all.forEach(article =>{
        $('#articles').append(article.toHtml());
    });

    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
};
