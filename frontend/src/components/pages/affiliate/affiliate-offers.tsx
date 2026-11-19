'use client';

export type AffiliateOffer = {
    name: string;
    description: string;
    html: string;
};

export default function AffiliateOffers() {
    return (
        <div className="mt-10 grid gap-5 md:grid-cols-2">

            <article key="it-nut-hosting" className="rounded-[28px] border border-slate-200/80 bg-slate-50/70 p-5 sm:p-7 dark:border-white/10 dark:bg-slate-900/50">
                <h2 className="font-serif text-2xl font-semibold">IT Nut Hosting</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">BDIX SERVER</p>
                <div className="affiliate-offer mt-6 [&_.affiliate-placeholder]:inline-flex [&_.affiliate-placeholder]:items-center [&_.affiliate-placeholder]:justify-center [&_.affiliate-placeholder]:rounded-full [&_.affiliate-placeholder]:bg-accent [&_.affiliate-placeholder]:px-5 [&_.affiliate-placeholder]:py-3 [&_.affiliate-placeholder]:text-sm [&_.affiliate-placeholder]:font-semibold [&_.affiliate-placeholder]:text-white [&_.affiliate-placeholder]:transition hover:[&_.affiliate-placeholder]:-translate-y-1" dangerouslySetInnerHTML={{ __html: '<a href="https://clients.itnuthosting.com/aff.php?aff=1183&p=1" target="_blank" rel="noopener"> <img src="https://itnut.net/affiliate/250x250.png"> </a>' }} />
            </article>


            <article key="exonhost" className="rounded-[28px] border border-slate-200/80 bg-slate-50/70 p-5 sm:p-7 dark:border-white/10 dark:bg-slate-900/50">
                <h2 className="font-serif text-2xl font-semibold">Exonhost</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">BDIX SERVER</p>
                <div className="affiliate-offer mt-6 [&_.affiliate-placeholder]:inline-flex [&_.affiliate-placeholder]:items-center [&_.affiliate-placeholder]:justify-center [&_.affiliate-placeholder]:rounded-full [&_.affiliate-placeholder]:bg-accent [&_.affiliate-placeholder]:px-5 [&_.affiliate-placeholder]:py-3 [&_.affiliate-placeholder]:text-sm [&_.affiliate-placeholder]:font-semibold [&_.affiliate-placeholder]:text-white [&_.affiliate-placeholder]:transition hover:[&_.affiliate-placeholder]:-translate-y-1" dangerouslySetInnerHTML={{ __html: '<a href="https://my.exonhost.com/affiliate?aff=3816" target="_blank" rel="noopener"> <img width="250" height="250" src="https://scontent.fdac198-2.fna.fbcdn.net/v/t39.30808-6/827699364_1722684286529299_2425286860439619485_n.jpg?stp=dst-jpg_tt6&cstp=mx1254x1229&ctp=s1254x1229&_nc_cat=108&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_ohc=B-DZc0b9PnEQ7kNvwGxc6Me&_nc_oc=AdpcCfjnsvkY4l2hBeL-2A_q-4ih-TwATFHwGU5AngTMHv5phezwh_SGPr6NplfeDyg&_nc_zt=23&_nc_ht=scontent.fdac198-2.fna&_nc_gid=jQkCW1sMbDsQN3Ua3SSzRw&_nc_ss=7b2a8&oh=00_AQTGMzl6gzwIhNZ0VEC5OV7u2_QqcnVvglFes1087vpQkA&oe=6B03DB08"> </a>' }} />
            </article>

        </div>
    );
}
