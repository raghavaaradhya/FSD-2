package com._BDS3A.PaginationAndSorting.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com._BDS3A.PaginationAndSorting.Model.Post;
 

public interface PostRepository extends JpaRepository<Post, Long> {

 

    // Fix N+1 problem using JOIN FETCH

    @Query(

        value = """

                SELECT p

                FROM Post p

                JOIN FETCH p.account

                """,

        countQuery = """

                SELECT COUNT(p)

                FROM Post p

                """

    )

    Page<Post> findAllPostsWithAccount(Pageable pageable);

 

 

    // Native SQL Query - Top Performing Posts

    @Query(

value = "SELECT * FROM posts " +"ORDER BY (likes + comments + views) DESC " +"LIMIT 1", nativeQuery = true

   )

    List<Post> findTopPerformingPosts(

            @Param("limit") int limit

    );

 

 

    // JPQL Analytics Query

    @Query("""

            SELECT

                COUNT(p),

                COALESCE(SUM(p.likes), 0),

                COALESCE(SUM(p.comments), 0),

                COALESCE(SUM(p.views), 0)

            FROM Post p

            """)

    Object getAnalytics();

}


