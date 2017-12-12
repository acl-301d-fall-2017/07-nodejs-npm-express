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
// This function is called from new.html. It sets an event listener so that when the id of article-json is called within the browser, it will become selected. It sets two more event listeners on #new-form for submission and any input in the text area.

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
// This function is called when a change happens within input fields or textareas of #new-form.

articleView.create = () => {
    let article;
    $('#articles').empty();

    article = new Article({ //eslint-disable-line
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
// When #new-form is submitted, then this function is called.
articleView.submit = event => {
    event.preventDefault();
    let article = new Article({ //eslint-disable-line
        title: $('#article-title').val(),
        author: $('#article-author').val(),
        authorUrl: $('#article-author-url').val(),
        category: $('#article-category').val(),
        body: $('#article-body').val(),
        publishedOn: $('#article-published:checked').length ? new Date() : null
    });

    // COMMENT: Where is this function defined? When is this function called? What event ultimately triggers its execution?
    // It is defined within article.js. Each time a new article is submitted from #new-article form, this function is called.
    article.insertRecord();
};

articleView.initIndexPage = () => {
    Article.all.forEach(article =>{ //eslint-disable-line
        $('#articles').append(article.toHtml());
    });

    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
};
