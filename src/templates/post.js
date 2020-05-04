import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/common';
import { MetaData } from '../components/common/meta';

import Disqus from 'disqus-react';

const Post = ({ data, location }) => {
  const post = data.ghostPost;
  const disqusShortname = 'leifermendez-github-io';
  const disqusConfig = {
    url: `https://arepa.dev/${post.slug}/`,
    identifier: post.id,
    title: post.title
  };
  return (
    <>
      <MetaData
        data={data}
        location={location}
        type="article"
      />
      <Helmet>
        <style type="text/css">{`${post.codeinjection_styles}`}</style>
      </Helmet>
      <Layout>
        <div className="container">
          <article className="content">
            <section className="post-full-content">
              <div className="post-content-inner">
                <h1 className="content-title">{post.title}</h1>
                <section
                  className="content-body load-external-scripts"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </div>
              <div className="post-content-sidebar">
                <div className="post-date">
                  {post.published_at_pretty}
                </div>
                <figure className="post-feature-image">
                  <img src={post.feature_image} alt={post.title} />
                </figure>
                <div className="post-author-profile">
                  <h2>Leifer Mendez</h2>
                  <p>Experto en desarrollo tecnológico tanto en back como en frontend. 8 años de experiencia trabajando para numerosas empresas actualmente liderando un equipo.</p>
                </div>
                <div className="post-tags">
                  {post.tags.map((tag, index) => (
                    <a
                      className="post-tag"
                      href={`/tag/${tag.slug}`}
                      key={index}
                    >
                      #{tag.name}
                    </a>
                  ))}
                </div>
                <div className="post-follow">
                  <a href="https://twitter.com/leifermendez" target="_blank" rel="noopener noreferrer">
                    <img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /> Sígueme @leifermendez
                  </a>
                </div>
                <div className="post-coffee">
                  <a href="https://www.buymeacoffee.com/leifermendez" target="_blank" rel="noopener noreferrer">
                    <img src="https://cdn.buymeacoffee.com/buttons/lato-black.png" alt="Buy Me A Coffee" />
                  </a>
                </div>
              </div>
            </section>
            <section className="post-full-content">
              <div className="post-disqus">
                <Disqus.DiscussionEmbed
                  shortname={disqusShortname}
                  config={disqusConfig}
                />
              </div>
            </section>
          </article>
        </div>
      </Layout>
    </>
  );
};

Post.propTypes = {
  data: PropTypes.shape({
    ghostPost: PropTypes.shape({
      codeinjection_styles: PropTypes.object,
      title: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string
    }).isRequired
  }).isRequired,
  location: PropTypes.object.isRequired
};

export default Post;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: {eq: $slug }) {
        ...GhostPostFields
      }
      }
  `;
